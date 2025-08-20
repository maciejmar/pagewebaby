import { Component, OnInit, Input, HostListener , ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isToDisplay = true;
  showLoginRegister = false;
  @Input() isFromMainSection: boolean = false; 
  @Input() scrolled: boolean | null = null; 
  isMenuOpen = false;
  // Lokalne wykrywanie (fallback, gdy scrolled == null):
  @ViewChild('contentAnchor') contentAnchor!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    // Aktualizuj tylko gdy rodzic NIE steruje
    if (this.scrolled === null) {
      this.isScrolledInternal = window.scrollY > 0;
    }
  }

   // Lokalne wykrywanie (fallback, gdy scrolled == null):
  private isScrolledInternal = false;

  get isActuallyScrolled(): boolean {
    return this.scrolled ?? this.isScrolledInternal;
  }

  scrollToTop(event: Event) {
    event.preventDefault(); // blokuje przeładowanie / nawigację przez <a href="#">
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

   toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollDown_t(): void {
  
    if (this.contentAnchor) {
      this.contentAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}


