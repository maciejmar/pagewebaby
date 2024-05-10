import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  visible = false;
  
  @Input () bgClass: string = 'default-bg';
  showModal: boolean = false;
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    AOS.init();
  }

  icons=[ "bi bi-youtube h1", "bi bi-facebook h1",
   "bi bi-twitter-x h1", "bi bi-instagram h1","bi bi-linkedin h1", "bi bi-envelope h1", "bi bi-discord h1"];

   random_boolean = Math.random() < 0.5;

   togglePrivacyPolicyModal(): void {
    this.showModal = !this.showModal;
    this.cdRef.detectChanges();
    console.log('Modal should be:', this.showModal); 
  }
}

