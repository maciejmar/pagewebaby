import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing-shell',
  templateUrl: './landing-shell.component.html',
  styleUrls: ['./landing-shell.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class LandingShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
