import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule,RouterLink, RouterLinkActive],
    standalone: true
  
})
export class HeaderComponent{
  constructor(private router: Router) {}

  // If we’re already on "/", just scroll to top smoothly.
  onHomeClick(ev: Event) {
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // else let router navigate to "/"
  }
  scrolled=false; menuOpen=false;
  @HostListener('window:scroll') onScroll(){ this.scrolled = window.scrollY > 40; }
  toggleMenu(){ this.menuOpen = !this.menuOpen; }
  closeMenu(){ this.menuOpen = false; }
}



