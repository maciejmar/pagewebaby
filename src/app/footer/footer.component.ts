import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  icons=[ "bi bi-youtube", "bi bi-facebook",
   "bi bi-twitter", "bi bi-instagram","bi bi-linkedin", "bi bi-envelope"];
}
