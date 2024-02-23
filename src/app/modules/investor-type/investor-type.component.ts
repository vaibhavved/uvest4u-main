import { Component, ElementRef, WritableSignal, computed, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { question, questionnaire, replyQuestioner } from 'src/app/services/investor-type/investortype.interface';
import { InvestortypeService } from 'src/app/services/investor-type/investortype.service';
import { CookieService } from "ngx-cookie-service";
import { MatDialog } from '@angular/material/dialog';
import { JoinMailingListComponent } from 'src/app/shared/popups/join-mailing-list/join-mailing-list.component';
import Swal from 'sweetalert2';

/**
* statusSignal type
*/
type statusSigType = {
  class: string,
  status: string
}

@Component({
  selector: 'app-investor-type',
  templateUrl: './investor-type.component.html',
  styleUrls: ['./investor-type.component.scss']
})
export class InvestorTypeComponent {

  private invetorTypeService = inject(InvestortypeService);

  private route = inject(Router);

  private cookieService = inject(CookieService);

  private dialog = inject(MatDialog);

  private elementRef = inject(ElementRef)
  /**
   * stores the questions
   */
  private questions: string[] = [];

  /**
   * Stores the market email
   */
  private getMarketEmail: string = this.cookieService.get('marketEmail');
  
  public windowWidth = window.innerWidth

  /**
   * Stores questioner
   */
  public questionData!: questionnaire;

  /**
  * stores the answers
  */
  public answers: string[] = [];

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
  public isItemInLocalStorage: boolean = localStorage.getItem('repliedAnswers') != null;
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
        this.questions.push(res1.description);
        this.answers.push('')
        this.replyQuestion.update((replyQues: replyQuestioner): replyQuestioner => { return { ...replyQues, questions: this.questions } });
        this.replyQuestion.update((replyQues: replyQuestioner): replyQuestioner => { return { ...replyQues, answers: this.answers } });
      });
      this.replyQuestion.update((replyQues: replyQuestioner): replyQuestioner => { return { ...replyQues, questionnaireId: res.id } });
      this.checkStorage();
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

  checkStorage(): void {
    if (localStorage.getItem('repliedAnswers')) {
      this.answers = JSON.parse(localStorage.getItem('repliedAnswers') as string)
      this.replyQuestion.update((replyQue: replyQuestioner) => {
        return { ...replyQue, answers: JSON.parse(localStorage.getItem('repliedAnswers') as string) }
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
   * 
   * @param index index of changed statusSignal 
   * Changes the status of selected signal
   */
  changeStatusSignal(index: number, answer: string): void {
    this.replyQuestion.update((replyQues: replyQuestioner) => {
      replyQues.answers.map((res: string, j: number) => {
        if (index == j) { replyQues.answers[j] = answer }
        return res;
      })
      return replyQues;
    })
    this.qIndex.set(index);
    this.statusSignal.update((statusSig: statusSigType[]) => statusSig.map((sig: statusSigType, j: number) => {
      if (index == j) {
        sig = {
          class: 'done',
          status: 'EDIT'
        }
        this.nextBtnStatusSig.set(true);
      } else if (index + 1 == j && !this.replyQuestion().answers[j]) {
        sig = {
          class: 'current',
          status: 'ACTIVE'
        }
      }
      else if (index !== j && this.replyQuestion().answers[j - 1] && !this.replyQuestion().answers[j]) {
        sig = {
          class: 'current',
          status: 'ACTIVE'
        }
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
    })

    this.allQuestionCheck.set(this.replyQuestion().answers.every(ele => ele != ''))
  }

  /**
   * @param index index of clicked statusSignal
   * Opens the clicked question
   */
  openCurrentQuestion(index: number): void {
    this.qIndex.set(index);
    this.nextBtnStatusSig.set(false);
    this.statusSignal.update((statusSig: statusSigType[]) => statusSig.map((sig: statusSigType, j: number) => {
      if (index == j && index != 0 && ((this.statusSignal()[index - 1]?.class == 'done' || this.statusSignal()[index - 1]?.class == 'current') && this.replyQuestion().answers[index - 1])) {
        sig = {
          class: 'current',
          status: 'ACTIVE'
        }
        if (this.statusSignal()[index + 1]?.class == 'done') {
          this.nextBtnStatusSig.set(true);
        } else {
          this.nextBtnStatusSig.set(false);
        }
      } if (index - 1 == j && index != 0 && ((this.statusSignal()[index - 1]?.class == 'done' || this.statusSignal()[index - 1]?.class == 'current') && this.replyQuestion().answers[index - 1])) {
        sig = {
          class: 'done',
          status: 'EDIT'
        }
        if (this.statusSignal()[index + 1]?.class == 'done') {
          this.nextBtnStatusSig.set(true);
        } else {
          this.nextBtnStatusSig.set(false);
        }
      } else if (index == 0 && index == j) {
        sig = {
          class: 'current',
          status: 'ACTIVE'
        }
        if (this.statusSignal()[index + 1]?.class == 'done') {
          this.nextBtnStatusSig.set(true);
        } else {
          this.nextBtnStatusSig.set(false);
        }
      } else if (index != j && index - 1 != 0 && this.statusSignal()[j].status != 'EDIT' && (index != 0 && this.statusSignal()[index - 1].class == 'done') && !this.replyQuestion().answers[index]) {
        sig = {
          class: '',
          status: 'NEXT'
        }
      } else if (index != j && this.statusSignal()[j].status != 'EDIT' && !this.replyQuestion().answers[j]) {
        sig = {
          class: '',
          status: 'NEXT'
        }
      } else if (index != j && this.statusSignal()[j].status != 'EDIT' && this.replyQuestion().answers[j]) {
        sig = {
          class: 'done',
          status: 'EDIT'
        }
      }
      return sig;
    })
    )
  }

  /**
   * @param index Gives the index of question on click of next button
   * Onclick of next opens the next question
   */
  nextQuestion(index: number): void {
    if (index != this.statusSignal()?.length - 1) {
      this.openCurrentQuestion(index + 1);
    } else {
      this.openCurrentQuestion(index);
    }
  }

  /**
   * Onclick of back opens the previous question
   */
  // previousQuestion(index: number) {
  //   if (index != 0) {
  //     this.openCurrentQuestion(index - 1);
  //   } else {
  //     this.openCurrentQuestion(index);
  //   }
  // }

  /**
   * Saves Questioner's response
   */
  saveResponse(): void {
    if (this.getMarketEmail) {
      localStorage.setItem('repliedAnswers', JSON.stringify(this.replyQuestion().answers));
      this.route.navigate(['/waiting-for-ai-response'], { state: { data: this.replyQuestion() } })
    } else {
      let matDialog = this.dialog.open(JoinMailingListComponent, {
        width: '684px',
        backdropClass: 'modal-backdrop',
        panelClass: ['modal-wrapper', 'modal-md'],
        data: { data: this.replyQuestion() }
      })
      // this.route.navigate(['/waiting-for-ai-response'], { state: { data: this.replyQuestion()} })
    }

  }

  /**
   * Scrolls to the active question
   */
  ngAfterViewInit() {
   window.addEventListener('resize',()=>{
    this.windowWidth = window.innerWidth;
   })
  }
  /**
   * Removes the answers from answer array
   */
  ngOnDestroy(): void {
    this.answers = [];
  }
}
