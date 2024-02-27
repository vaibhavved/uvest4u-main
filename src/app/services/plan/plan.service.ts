import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomOperators } from 'src/app/shared/operators/custom-operators';
import { PayPlan} from './plan.interface';


@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private http = inject(HttpClient);
  private operator = inject(CustomOperators);

  /**
   * It will give array of plans
   * @returns the list of plans
   */
  getPayPalPlan(): Observable<PayPlan[]> {
    return this.http
      .get<PayPlan[]>(`/SysData/GroupName/PayPalPlan`)
      .pipe(this.operator.extractResponseOnly());
  }
}
