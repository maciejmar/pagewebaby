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
    CampaignMottoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
