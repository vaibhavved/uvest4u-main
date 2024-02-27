import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { analysis, replyQuestioner } from 'src/app/services/investor-type/investortype.interface';
import { InvestortypeService } from 'src/app/services/investor-type/investortype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-waiting-for-ai-response',
  templateUrl: './waiting-for-ai-response.component.html',
  styleUrl: './waiting-for-ai-response.component.scss'
})
export class WaitingForAiResponseComponent {
  private invetorTypeService = inject(InvestortypeService);

  private route = inject(Router);

  /**
   * Gets the Questioner's reply
   */
  private replyQuestions = signal<replyQuestioner>(this.route?.getCurrentNavigation()?.extras?.state?.data);

  /**
   * Save the questioner's response observable
   */
  saveResponse$ = this.invetorTypeService.saveResponse(this.replyQuestions()).pipe(
    tap((res: analysis) => {
      localStorage.setItem('repliedAnswers', JSON.stringify(this.replyQuestions().answers));
      this.route.navigate(['/analysis'], { state: { analisys: res?.analysis } });
    }),
    catchError(err => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${err.error}`,
        showConfirmButton: false,
        timer: 1500
      });
      return err;
    })
  );
}
