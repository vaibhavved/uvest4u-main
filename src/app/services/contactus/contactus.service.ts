import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { contactUs } from "./contactus.interface";
import { CustomOperators } from "src/app/shared/operators/custom-operators";

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http: HttpClient,private operator:CustomOperators) { }

  //contact us
  contact_us_form(data: contactUs): Observable<string> {
    return this.http.put<string>(environment.apiBaseUrl + '/Message/', data, {
      headers: new HttpHeaders().set('Skip-auth', 'true')
    }).pipe(this.operator.extractResponseWithString())
  }
}
