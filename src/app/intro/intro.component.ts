import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { timer } from 'rxjs';
@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
    standalone: false
})
export class IntroComponent implements OnInit {
  @Output() introEnded= new EventEmitter<boolean>();
  @Output() videoEnded = new EventEmitter<void>();
  
  val = 10;

 

  
  constructor(private sharedService:SharedBetweenSiblingsService, private router: Router ) {
    timer(5500).subscribe(() => (this.val = -1));
   }
  
   ngOnInit(): void {
    this.sharedService.getVideoState().subscribe(play => {
      if (play) {
        this.val = 10; // Show video
      } else {
        this.val = -1; // Hide video
      }
    });
  }

  onVideoEnd() {
    this.val = -1; // Hide video after playing
    this.sharedService.triggerVideo(false); // Reset video state in service
  }

  
  ngOnDestroy():void{
   
      
      this.introEnded.emit(true);
      
    }
  }

