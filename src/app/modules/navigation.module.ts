import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InvestmentIdeaComponent } from './investment-idea/investment-idea.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { NewsComponent } from './news/news.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { InvestorTypeComponent } from './investor-type/investor-type.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { HowWorksComponent } from './how-works/how-works.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DaySuffixPipe } from '../shared/pipes/day-suffix.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { WaitingForAiResponseComponent } from './waiting-for-ai-response/waiting-for-ai-response.component';

@NgModule({
  declarations: [
    HomeComponent,
    PricingComponent,
    AboutUsComponent,
    ContactComponent,
    InvestmentIdeaComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    NewsComponent,
    AnalysisComponent,
    InvestorTypeComponent,
    NewsDetailComponent,
    HowWorksComponent,
    WaitingForAiResponseComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    NavigationRoutingModule,
    SlickCarouselModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    DaySuffixPipe,
    MatDialogModule,
  ],
})
export class NavigationModule { }
