// app.component.ts (recap)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './landing/shared/header/header.component';
import { FooterComponent } from './landing/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  
  template: `
    <header></header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {}
