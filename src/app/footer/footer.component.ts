import { Component, OnInit, Input } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  visible = false;
  @Input () bgClass: string = 'default-bg';
  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  icons=[ "bi bi-youtube h1", "bi bi-facebook h1",
   "bi bi-twitter h1", "bi bi-instagram h1","bi bi-linkedin h1", "bi bi-envelope h1"];

   random_boolean = Math.random() < 0.5;
}

