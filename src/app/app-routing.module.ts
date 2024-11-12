import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GameComponent } from './game/game.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PolicyPrivacyEnComponent } from './policy-privacy-en/policy-privacy-en.component';
import { PrivacyPolicyBasketballComponent } from './privacy-policy-basketball/privacy-policy-basketball.component';
import { PrivacyPolicyEquationsComponent } from './privacy-policy-equations/privacy-policy-equations.component';

const routes: Routes = [
    //{ path: '', redirectTo: '/', pathMatch: 'full' },
    
    { path: '', component: MainComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'privacy-policy-en', component: PolicyPrivacyEnComponent},
    { path: 'privacy-policy-basketball', component: PrivacyPolicyBasketballComponent },
    { path: 'privacy-policy-system-of-equations', component: PrivacyPolicyEquationsComponent },
    { path: 'logo', component: IntroComponent },
    { path: 'game', component: GameComponent },
    { path: 'abecadlowo', component: AppComponent },
    { path: '**', component: PagenotfoundComponent },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
