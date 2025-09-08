import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss'],
    standalone: false
})
export class HeroComponent{

  @Input() ctaLink: string | any[] = '/';   // pozwala na string lub [routerLink] w formie tablicy
  @Input() ctaFragment?: string;            // fragment do scrollowania/anchor
  @Input() compact = false;                 // tryb zwarty
  scrollToProducts(){
    const el = document.querySelector('#products'); if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }
  scrollToAboutUs(){
    const el = document.querySelector('#aboutus'); if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }
}
