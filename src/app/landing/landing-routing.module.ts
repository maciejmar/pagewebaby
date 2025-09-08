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
      // SPECYFICZNE slugi – PRZED generykami:
      { path: 'products/system-of-equations-trainer',
        loadChildren: () => import('./tutorials/system-of-equations-trainer/tutorial.route').then(m => m.default) },

      { path: 'products/abecadlowo',
        loadChildren: () => import('./tutorials/abecadlowo/tutorial.route').then(m => m.default) },

      { path: 'products/abc-land',
        loadChildren: () => import('./tutorials/abc-land/tutorial.route').then(m => m.default) },

      // GENERYCZNE – NA KOŃCU:
      { path: 'products/:slug',
        loadComponent: () => import('./pages/tutorial-page/tutorial-page.component').then(m => m.TutorialPageComponent) },

      { path: 'tutorial/:slug',
        loadComponent: () => import('./pages/tutorial-page/tutorial-page.component').then(m => m.TutorialPageComponent) },
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