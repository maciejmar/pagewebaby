import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { timer } from 'rxjs';
import AOS from 'aos'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  val = 10;
  showNeonEffect = false;
  constructor(private sharedService:SharedBetweenSiblingsService, private router: Router ) {
    timer(5500).subscribe(() => (this.val = -1));
   }

  ngOnInit(): void {
    AOS.init()
  }
  buttonClicked() {
    this.sharedService.setClickedButton('Button was clicked');
  }

  
}
