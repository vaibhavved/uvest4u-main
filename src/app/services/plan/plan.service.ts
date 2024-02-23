import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { CustomOperators } from "src/app/shared/operators/custom-operators";
import { PayPlan, plan } from "./plan.interface";
import { ResponseOnlyData } from "src/app/model/interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private http = inject(HttpClient);
  private operator = inject(CustomOperators);

  /**
   * 
   * @returns the list of plans
   */
  getPayPalPlan(): Observable<PayPlan[]> {
    return this.http.get<PayPlan[]>(environment.apiBaseUrl + `/SysData/GroupName/PayPalPlan`).pipe(this.operator.extractResponseOnly())
  }
}
