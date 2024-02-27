import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomOperators } from 'src/app/shared/operators/custom-operators';
import { analysis, questionnaire, replyQuestioner } from './investortype.interface';
@Injectable({
  providedIn: 'root'
})
export class InvestortypeService {
  private http = inject(HttpClient);
  private operator = inject(CustomOperators);

  /**
   *
   * @returns Questioner's questions
   */
  getQuestions(): Observable<questionnaire> {
    return this.http
      .get<questionnaire>(`/Profiler/GetCurrentQuestionnaire`)
      .pipe(this.operator.extractResponseOnly());
  }

  /**
   * It saves the response of user answers
   * @param body It's a Reply payload of questioner's quentions
   * @returns the Analysis object
   */
  saveResponse(body?: replyQuestioner): Observable<analysis> {
    return this.http
      .post<analysis>(`/Profiler/AnalyzeResponses`, body, {
        headers: new HttpHeaders().set('Skip-auth', 'true')
      })
      .pipe(this.operator.extractResponseOnly());
  }
}
