import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    return this.http.get<questionnaire>(`${environment.apiBaseUrl}/Profiler/GetCurrentQuestionnaire`).pipe(this.operator.extractResponseOnly());
  }

  /**
   * 
   * @param body It's a Reply payload of questioner's quentions
   * @returns the Analysis object
   */
  saveResponse(body?: replyQuestioner): Observable<analysis> {
    return this.http.post<analysis>(`${environment.apiBaseUrl}/Profiler/AnalyzeResponses`, body, {
      headers: new HttpHeaders().set('Skip-auth', 'true')
    }).pipe(this.operator.extractResponseOnly());
  }
}
