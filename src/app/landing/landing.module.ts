// app/landing/landing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingShellComponent } from './shell/landing-shell/landing-shell.component';
import { LandingHomeComponent } from './pages/home/landing-home/landing-home.component';
import { BrowserModule } from '@angular/platform-browser';
// ZIP components:
import { HeaderComponent } from './shared/header/header.component';
import { HeroComponent } from './shared/hero/hero.component';
import { ProductsCarouselComponent } from './shared/products-carousel/products-carousel.component';
import { AboutComponent } from './shared/about/about.component';
import { ContactComponent } from './shared/contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { QRCodeComponent } from 'angularx-qrcode';
// (opcjonalnie) jeżeli chcesz używać ResizeFontDirective wewnątrz landing:
import { SharedModule as GlobalSharedModule } from '../shared/shared.module';
import { ScrollToInShadowDirective } from './shared/scroll-to-in-shadow.directive';

@NgModule({
  declarations: [
    LandingShellComponent,
    LandingHomeComponent,
    HeaderComponent,
    HeroComponent,
    ProductsCarouselComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ScrollToInShadowDirective
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatDialogModule,
    MatButtonModule,
    QRCodeComponent,  
    
    
  ],
   exports: [
    HeroComponent,    
  ],
})
export class LandingModule {
   
}
