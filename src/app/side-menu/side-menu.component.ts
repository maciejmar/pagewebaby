import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isToDisplay = true;
  showLoginRegister = false;
  @Input() isFromMainSection: boolean = false;  
  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop(event: Event) {
    event.preventDefault(); // blokuje przeładowanie / nawigację przez <a href="#">
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
