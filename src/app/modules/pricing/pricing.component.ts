import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { PayPlan, plan } from 'src/app/services/plan/plan.interface';
import { PlanService } from 'src/app/services/plan/plan.service';



@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  /**
   * plan service injection
   */
  private planService = inject(PlanService);

  /**
   * meta service injection
   */
  private metaService = inject(Meta);

  /**
   * title service injection
   */
  private titleService = inject(Title);

  /**
   * Plans array
   */
  public plans: plan[] = [];

  /**
   * loader flag
   */
  public isLoader = false;

  /**
   * Get paypal plan observable
   * 
   */
  public getPayPalPlan$ = this.planService.getPayPalPlan().pipe(
    tap((resp: PayPlan[]) => {
      resp.map((plans: PayPlan) => {
        const data = plans.codeName.split('|');
        this.plans.push({
          planName: data[0],
          planPrice: Number(data[1]),
          planId: data[2]
        })
        return resp
      })
    }))

  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Discover a range of affordable investment plans tailored for every investor\'s needs. Start building your financial future today with our reliable investment options.' },
    ]);
    this.titleService.setTitle("Invest Wisely with Our Affordable Plans | Uvest4U");
  }

  /**
   * 
   * @param planId used to pass in signup page state
   * selects plan and redirect to sign up page
   */
  selectedPlanType(planId: string): void {
    // this.route.navigate(['/sign-up'], { state: { plan: planId } })
  }
}
