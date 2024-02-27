import { Component, ElementRef, WritableSignal, computed, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { question, questionnaire, replyQuestioner } from 'src/app/services/investor-type/investortype.interface';
import { InvestortypeService } from 'src/app/services/investor-type/investortype.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { JoinMailingListComponent } from 'src/app/shared/popups/join-mailing-list/join-mailing-list.component';
import { Title } from '@angular/platform-browser';

/**
 * statusSignal type
 */
type statusSigType = {
  class: string;
  status: string;
};

@Component({
  selector: 'app-investor-type',
  templateUrl: './investor-type.component.html',
  styleUrls: ['./investor-type.component.scss']
})
export class InvestorTypeComponent {
  private titleService = inject(Title);

  private invetorTypeService = inject(InvestortypeService);

  private route = inject(Router);

  private cookieService = inject(CookieService);

  private dialog = inject(MatDialog);

  private elementRef = inject(ElementRef);

  /**
   * stores the questions
   */
  private questions = signal<string[]>([]);

  /**
   * Stores the market email
   */
  private getMarketEmail = signal(this.cookieService.get('marketEmail'));

  /**
   * Check for window width and returns true if it's less then 768px
   */
  public windowWidthCheck = signal<boolean>(window.innerWidth <= 767);

  /**
   * stores the answers
   */
  public answers = signal<string[]>([]);

  /**
   * Reply to questioner
   */
  public replyQuestion = signal<replyQuestioner>({
    answers: [],
    emailAddress: '',
    questionnaireId: 0,
    questions: []
  });

  /**
   * Checks wether ansewrs are saved in local storage or not
   */
  public isItemInLocalStorage = signal<boolean>(localStorage.getItem('repliedAnswers') != null);

  /**
   * Get Qustioner observable
   */
  getQuestions$ = this.invetorTypeService.getQuestions().pipe(
    tap((res: questionnaire) => {
      // this.questionData = res;
      res.questions.forEach((res1: question, index: number) => {
        if (index == 0) {
          this.statusSignal.update((sig: statusSigType[]) => {
            sig.push({ class: 'current', status: 'ACTIVE' });
            return sig;
          });
        } else {
          this.statusSignal.update((sig: statusSigType[]) => {
            sig.push({ class: '', status: 'NEXT' });
            return sig;
          });
        }
        this.questions.update((sig: string[]): string[] => {
          sig.push(res1.description);
          return sig;
        });
        this.answers.update(ans => {
          ans.push('');
          return ans;
        });
        this.replyQuestion.update((replyQues: replyQuestioner): replyQuestioner => {
          return { ...replyQues, questions: this.questions() };
        });
        this.replyQuestion.update((replyQues: replyQuestioner): replyQuestioner => {
          return { ...replyQues, answers: this.answers() };
        });
      });
      this.replyQuestion.update((replyQues: replyQuestioner): replyQuestioner => {
        return { ...replyQues, questionnaireId: res.id };
      });
      this.checkStorage();
    }),
    catchError(() => {
      throw new Error('Something went wrong, Please try again or reload the browser');
    })
  );

  /**
   * Stores question's Index
   */
  public qIndex = signal<number>(0);

  /**
   *  Status Signal Array
   */
  public statusSignal = signal<statusSigType[]>([]);

  /**
   * Signal for checking all question completed
   */
  public allQuestionCheck = signal(false);

  /**
   * Next button signal
   */
  public nextBtnStatusSig = signal<boolean>(false);

  ngOnInit():void{
    this.titleService.setTitle('What Type of Investor Are You?')
  }

  /**
   * Checks if answers are stored in localstorage and if yes then
   * Show those answes selected on questions's answer
   */
  checkStorage(): void {
    const RepliedAnswerStorage = localStorage.getItem('repliedAnswers') as string;
    if (RepliedAnswerStorage) {
      this.answers.set(JSON.parse(RepliedAnswerStorage));
      this.replyQuestion.update((replyQue: replyQuestioner) => {
        return { ...replyQue, answers: JSON.parse(RepliedAnswerStorage) };
      });
      this.statusSignal.update((statusSig: statusSigType[]) =>
        statusSig.map((sig: statusSigType) => {
          sig.class = 'done';
          sig.status = 'EDIT';
          return sig;
        })
      );
      localStorage.removeItem('repliedAnswers');
      this.allQuestionCheck.set(true);
    }
    // this.replyQuestion.update((replyQue: replyQuestioner) => { return { ...replyQue, emailAddress: this.getMarketEmail } })
  }

  /**
   * Changes the status of selected signal
   * @param index index of changed statusSignal
   * @param answer on change of answer retuns selected answer
   *
   */
  changeStatusSignal(index: number, answer: string): void {
    this.replyQuestion.update((replyQues: replyQuestioner) => {
      replyQues.answers.map((res: string, j: number) => {
        if (index == j) {
          res = answer;
        }
        return res;
      });
      return replyQues;
    });
    this.qIndex.set(index);
    this.statusSignal.update((statusSig: statusSigType[]) =>
      statusSig.map((sig: statusSigType, j: number) => {
        if (index == j) {
          sig = {
            class: 'done',
            status: 'EDIT'
          };
          this.nextBtnStatusSig.set(true);
        } else if (index + 1 == j && !this.replyQuestion().answers[j]) {
          sig = {
            class: 'current',
            status: 'ACTIVE'
          };
        } else if (index !== j && this.replyQuestion().answers[j - 1] && !this.replyQuestion().answers[j]) {
          sig = {
            class: 'current',
            status: 'ACTIVE'
          };
          const element = this.elementRef.nativeElement.querySelector('.current');
        }
        return sig;
      })
    );
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector('.current');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    this.allQuestionCheck.set(this.replyQuestion().answers.every(ele => ele != ''));
  }

  /**
   * Opens the clicked question
   * @param index index of clicked statusSignal
   */
  openCurrentQuestion(index: number): void {
    this.qIndex.set(index);
    this.nextBtnStatusSig.set(false);
    this.statusSignal.update((statusSig: statusSigType[]) =>
      statusSig.map((sig: statusSigType, j: number) => {
        if (
          index == j &&
          index != 0 &&
          (this.statusSignal()[index - 1]?.class == 'done' || this.statusSignal()[index - 1]?.class == 'current') &&
          this.replyQuestion().answers[index - 1]
        ) {
          sig = {
            class: 'current',
            status: 'ACTIVE'
          };
          if (this.statusSignal()[index + 1]?.class == 'done') {
            this.nextBtnStatusSig.set(true);
          } else {
            this.nextBtnStatusSig.set(false);
          }
        }
        if (
          index - 1 == j &&
          index != 0 &&
          (this.statusSignal()[index - 1]?.class == 'done' || this.statusSignal()[index - 1]?.class == 'current') &&
          this.replyQuestion().answers[index - 1]
        ) {
          sig = {
            class: 'done',
            status: 'EDIT'
          };
          if (this.statusSignal()[index + 1]?.class == 'done') {
            this.nextBtnStatusSig.set(true);
          } else {
            this.nextBtnStatusSig.set(false);
          }
        } else if (index == 0 && index == j) {
          sig = {
            class: 'current',
            status: 'ACTIVE'
          };
          if (this.statusSignal()[index + 1]?.class == 'done') {
            this.nextBtnStatusSig.set(true);
          } else {
            this.nextBtnStatusSig.set(false);
          }
        } else if (
          index != j &&
          index - 1 != 0 &&
          this.statusSignal()[j].status != 'EDIT' &&
          index != 0 &&
          this.statusSignal()[index - 1].class == 'done' &&
          !this.replyQuestion().answers[index]
        ) {
          sig = {
            class: '',
            status: 'NEXT'
          };
        } else if (index != j && this.statusSignal()[j].status != 'EDIT' && !this.replyQuestion().answers[j]) {
          sig = {
            class: '',
            status: 'NEXT'
          };
        } else if (index != j && this.statusSignal()[j].status != 'EDIT' && this.replyQuestion().answers[j]) {
          sig = {
            class: 'done',
            status: 'EDIT'
          };
        }
        return sig;
      })
    );
  }

  /**
   * Checks if email is taken from mail popup if yes redirects to waiting for ai response screen
   * and if no then opens the mailing popup
   */
  saveResponse(): void {
    if (this.getMarketEmail()) {
      localStorage.setItem('repliedAnswers', JSON.stringify(this.replyQuestion().answers));
      this.route.navigate(['/waiting-for-ai-response'], { state: { data: this.replyQuestion() } });
    } else {
      let matDialog = this.dialog.open(JoinMailingListComponent, {
        width: '684px',
        backdropClass: 'modal-backdrop',
        panelClass: ['modal-wrapper', 'modal-md'],
        data: { data: this.replyQuestion() }
      });
      // this.route.navigate(['/waiting-for-ai-response'], { state: { data: this.replyQuestion()} })
    }
  }

  /**
   * Checks window width when resize and returns true if size is less than 768px to signql
   */
  ngAfterViewInit(): void {
    window.addEventListener('resize', () => {
      this.windowWidthCheck.set(window.innerWidth <= 767);
    });
  }
}
