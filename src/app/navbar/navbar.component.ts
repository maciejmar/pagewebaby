import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private sharedService:SharedBetweenSiblingsService, private router: Router ) { }

  ngOnInit(): void {
  }
  buttonClicked() {
    this.sharedService.setClickedButton('Button was clicked');
  }

  
}
