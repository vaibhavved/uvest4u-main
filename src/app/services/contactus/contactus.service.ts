import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { contactUs } from './contactus.interface';
import { CustomOperators } from 'src/app/shared/operators/custom-operators';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  private http = inject(HttpClient);
  private operator = inject(CustomOperators);

  /**
   * It will save the user contact details
   * @param data gives the contact details
   * @returns string observable
   */
  contact_us_form(data: contactUs): Observable<string> {
    return this.http
      .put<string>('/Message/', data, {
        headers: new HttpHeaders().set('Skip-auth', 'true')
      })
      .pipe(this.operator.extractResponseWithString());
  }
}
