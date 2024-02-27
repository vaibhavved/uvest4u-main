import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';
import { PayPlan, plan } from 'src/app/services/plan/plan.interface';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  private planService = inject(PlanService);

  private metaService = inject(Meta);

  private titleService = inject(Title);

  /**
   * Get paypal plan observable
   *
   */
  public getPayPalPlan$ = this.planService.getPayPalPlan().pipe(
    map(resp => {
      const mappedData = resp.map(plan => {
        const data = plan.codeName.split('|');
        return {
          ...plan,
          ...{ planName: data[0], planPrice: Number(data[1]), planId: data[2] }
        };
      });
      return mappedData;
    })
  );

  ngOnInit(): void {
    this.metaService.addTags([
      {
        name: 'description',
        content:
          "Discover a range of affordable investment plans tailored for every investor's needs. Start building your financial future today with our reliable investment options."
      }
    ]);
    this.titleService.setTitle('Invest Wisely with Our Affordable Plans | Uvest4U');
  }

  /**
   *
   * selects plan and redirect to sign up page
   * @param planId used to pass in signup page state
   *
   */
  selectedPlanType(planId?: string): void {
    // this.route.navigate(['/sign-up'], { state: { plan: planId } })
  }
}
