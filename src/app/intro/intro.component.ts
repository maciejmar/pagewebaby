import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  @Output() introEnded= new EventEmitter<boolean>();
  @Output() videoEnded = new EventEmitter<void>();
  
  val = 10;

  onVideoEnd() {
    this.videoEnded.emit();
  }
  constructor(private sharedService:SharedBetweenSiblingsService, private router: Router ) {
    timer(5500).subscribe(() => (this.val = -1));
   }


  ngOnInit(): void {
    
  }
  ngOnDestroy():void{
   
      
      this.introEnded.emit(true);
      
    }
  }

