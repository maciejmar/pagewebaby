import { Component, OnInit , Input, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { timer } from 'rxjs';
import AOS from 'aos'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  @Input() introEnded: boolean = false;
  val = 10;
  showNeonEffect = false;
 
  constructor(private sharedService: SharedBetweenSiblingsService, private cdRef: ChangeDetectorRef) {
    this.sharedService.getVideoState().subscribe(play => {
      console.log('Received play trigger:', play);
      if (play) {
        this.val = 10;
        setTimeout(() => {
          this.val = -1;
          this.cdRef.detectChanges(); 
        }, 5500);
      }
    });
  }

  
  
  

  

  buttonClicked() {
    this.sharedService.setClickedButton('Button was clicked');
  }

  
}
