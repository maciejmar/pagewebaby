import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GameComponent } from './game/game.component';
import { AboutWebabyComponent } from './about-webaby/about-webaby.component';
import { BasketballShotsComponent } from './basketball-shots/basketball-shots.component';
import { BasketballPwaComponent } from './basketball-pwa/basketball-pwa.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PolicyPrivacyEnComponent } from './policy-privacy-en/policy-privacy-en.component';
import { PrivacyPolicyBasketballComponent } from './privacy-policy-basketball/privacy-policy-basketball.component';
import { PrivacyPolicyEquationsComponent } from './privacy-policy-equations/privacy-policy-equations.component';


const routes: Routes = [
    { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    { path: 'legacy', component: MainComponent },  // Twoja poprzednia strona główna
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'privacy-policy-en', component: PolicyPrivacyEnComponent},
    { path: 'privacy-policy-basketball', component: PrivacyPolicyBasketballComponent },
    { path: 'privacy-policy-system-of-equations', component: PrivacyPolicyEquationsComponent },
    { path: 'basketball-shots', component: BasketballShotsComponent },
    { path: 'logo', component: IntroComponent },
    { path: 'game', component: GameComponent },
    { path: 'about_webaby', component: AboutWebabyComponent },
    

    // SPECYFICZNE (nad generycznymi)
{ path: 'products/abecadlowo',
  loadChildren: () => import('./landing/tutorials/abecadlowo/tutorial.route').then(m => m.default) },

{ path: 'products/abc-land',
  loadChildren: () => import('./landing/tutorials/abc-land/tutorial.route').then(m => m.default) },

{ path: 'products/system-of-equations-trainer',
  loadChildren: () => import('./landing/tutorials/system-of-equations-trainer/tutorial.route').then(m => m.default) },

// GENERYCZNE (na końcu)
{ path: 'products/:slug',
  loadComponent: () => import('./landing/pages/tutorial-page/tutorial-page.component')
    .then(m => m.TutorialPageComponent) },

{ path: 'tutorial/:slug',
  loadComponent: () => import('./landing/pages/tutorial-page/tutorial-page.component')
    .then(m => m.TutorialPageComponent) },
   
    // { path: '', component: MainComponent },
    // { path: 'privacy-policy', component: PrivacyPolicyComponent },
    // { path: 'privacy-policy-en', component: PolicyPrivacyEnComponent},
    // { path: 'privacy-policy-basketball', component: PrivacyPolicyBasketballComponent },
    // { path: 'privacy-policy-system-of-equations', component: PrivacyPolicyEquationsComponent },
    // { path: 'basketball-shots', component: BasketballShotsComponent },
    // { path: 'logo', component: IntroComponent },
    // { path: 'game', component: GameComponent },
    // { path: 'abecadlowo', component: AppComponent },
    // { path: 'about_webaby', component: AboutWebabyComponent },
    // //to zakomentowane //{ path: 'app-ads.txt', component:AppComponent},
    // { path: '**', component: PagenotfoundComponent },
    //to w komentarzu jako powtórzone - to poniżej:
  // { path: 'products/basketball-shots', component: BasketballShotsComponent },
  // { path: 'products/:slug', component: PagenotfoundComponent },
  // { path: 'tutorial/:slug', component: PagenotfoundComponent },

  { path: '**', component: PagenotfoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
