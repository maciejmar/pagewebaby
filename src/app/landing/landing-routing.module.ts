import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingShellComponent } from './shell/landing-shell/landing-shell.component';
import { LandingHomeComponent } from './pages/home/landing-home/landing-home.component';

const routes: Routes = [
  {
    path: '',
    component: LandingShellComponent,
    children: [
      { path: '', component: LandingHomeComponent },
      // tu będziemy dopisywać kolejne podstrony landing:
      // { path: 'pricing', component: LandingPricingComponent },
      // { path: 'contact', component: LandingContactComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}