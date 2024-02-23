import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { InvestmentIdeaComponent } from './investment-idea/investment-idea.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { NewsComponent } from './news/news.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { InvestorTypeComponent } from './investor-type/investor-type.component';
import { HowWorksComponent } from './how-works/how-works.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { keepStorageGuardGuard } from '../guards/keep-storage-guard.guard';
import { WaitingForAiResponseComponent } from './waiting-for-ai-response/waiting-for-ai-response.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { path: 'home', component: HomeComponent,pathMatch: 'full', canActivate:[keepStorageGuardGuard]},
  { path: 'pricing', component: PricingComponent, pathMatch: 'full', canActivate:[keepStorageGuardGuard]},
  { path: 'about-us', component: AboutUsComponent, pathMatch: 'full', canActivate:[keepStorageGuardGuard] },
  { path: 'contact', component: ContactComponent, pathMatch: 'full', canActivate:[keepStorageGuardGuard] },
  { path: 'investment-idea', component: InvestmentIdeaComponent, pathMatch: 'full', canActivate:[keepStorageGuardGuard] },
  { path: 'news', component: NewsComponent, pathMatch: 'full', canActivate:[keepStorageGuardGuard] },
  { path: 'news/:year/:month/:day/:title', component: NewsDetailComponent, pathMatch: 'full' , canActivate:[keepStorageGuardGuard]},
  { path: 'how-works', component: HowWorksComponent, canActivate:[keepStorageGuardGuard]},
  { path: 'analysis', component: AnalysisComponent , canActivate:[keepStorageGuardGuard]},
  { path: 'investor-type', component: InvestorTypeComponent, canActivate:[keepStorageGuardGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent , canActivate:[keepStorageGuardGuard]},
  { path: 'terms', component: TermsConditionComponent, canActivate:[keepStorageGuardGuard] },
  {path:'waiting-for-ai-response',component:WaitingForAiResponseComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class NavigationRoutingModule { }
