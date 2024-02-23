import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationRoutingModule } from './modules/navigation-routing.module';


const routes: Routes = [
  {
    loadChildren: () =>
      import('./modules/navigation.module').then((m) => m.NavigationModule),
    path: '',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true,scrollPositionRestoration: 'enabled' }),
    NavigationRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
