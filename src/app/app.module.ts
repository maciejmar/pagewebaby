import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { GameBadgeComponent } from './game-badge/game-badge.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IntroComponent } from './intro/intro.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CampaignMottoComponent } from './campaign-motto/campaign-motto.component';
import { GameComponent } from './game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmokeComponent } from './smoke/smoke.component';
import { LiteMotiveComponent } from './lite-motive/lite-motive.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PolicyPrivacyEnComponent } from './policy-privacy-en/policy-privacy-en.component';
import { PrivacyPolicyBasketballComponent } from './privacy-policy-basketball/privacy-policy-basketball.component';
import { PrivacyPolicyEquationsComponent } from './privacy-policy-equations/privacy-policy-equations.component';
import { AppAdsComponent } from './app-ads/app-ads.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainSectionComponent,
    GameBadgeComponent,
    SideMenuComponent,
    IntroComponent,
    MainComponent,
    PagenotfoundComponent,
    CampaignMottoComponent,
    GameComponent,
    SmokeComponent,
    LiteMotiveComponent,
    PrivacyPolicyComponent,
    PolicyPrivacyEnComponent,
    PrivacyPolicyBasketballComponent,
    PrivacyPolicyEquationsComponent,
    AppAdsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
