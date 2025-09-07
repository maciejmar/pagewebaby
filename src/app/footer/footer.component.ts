import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter } from '@angular/core';
import AOS from 'aos';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {
  visible = false;
  language_pl :boolean =true;
  @Input () bgClass: string = 'default-bg';
  showModal: boolean = false;
  
  
  
  constructor(private cdRef: ChangeDetectorRef, private router: Router) {}


  ngOnInit(): void {
    AOS.init();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       
        this.showModal = false;
        console.log('showModal ', this.showModal)
      }
    });
  }

  // icons=[ "bi bi-youtube h1", "bi bi-facebook h1",
  //  "bi bi-twitter-x h1", "bi bi-instagram h1","bi bi-linkedin h1", "bi bi-envelope h1", "bi bi-discord h1"];

  icons = [
    { class: "bi bi-youtube h1", url: "https://www.youtube.com/@webabygames9383" },
    { class: "bi bi-facebook h1", url: "https://www.facebook.com/twojProfil" },
    { class: "bi bi-twitter-x h1", url: "https://twitter.com/twojProfil" },
    { class: "bi bi-instagram h1", url: "https://www.instagram.com/twojProfil" },
    { class: "bi bi-linkedin h1", url: "https://www.linkedin.com/in/twojProfil" },
    { class: "bi bi-envelope h1", url: "mailto:kontakt@twojadomena.pl" },
    { class: "bi bi-discord h1", url: "https://discord.gg/link-do-serwera" }
  ];
   random_boolean = Math.random() < 0.5;

   togglePrivacyPolicyModal(): void {
    this.showModal = !this.showModal;
    this.cdRef.detectChanges();
    console.log('Modal should be:', this.showModal); 
  }
}

