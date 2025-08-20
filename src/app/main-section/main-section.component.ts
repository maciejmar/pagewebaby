import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { Subscription,timer } from 'rxjs';
import AOS from 'aos';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('600ms ease-in')),
      transition('in => out', animate('600ms ease-out'))
    ])
  ]
})
export class MainSectionComponent implements AfterViewInit  {
  message: string='';
  showElement = true;
  @Output() introEnded= new EventEmitter<boolean>();
 
 


  showVideo: boolean = false;
  videoHasEnded: boolean = true;
  animationState: string = 'out';

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('contentAnchor') contentAnchor!: ElementRef;
  ngAfterViewInit() {
    this.videoPlayer.nativeElement.play(); // This will now work without TypeScript errors.
  }


  

  playVideo(): void {
    console.log('playVideo called');
    this.showVideo = true;
    this.showElement = false;
    setTimeout(() => {
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        console.log('Playing video');
        this.videoPlayer.nativeElement.play();
      }
    }, 0);
  }
  toggleVideo(): void {
    this.animationState = this.animationState === 'in' ? 'out' : 'in';
    if (this.animationState === 'in' && this.videoPlayer) {
      setTimeout(() => this.videoPlayer.nativeElement.play(), 0);
    }
  }


  onVideoEnd(): void {
    
    this.animationState = 'out';
    
    this.showVideo = false;
    this.videoHasEnded = true; // Set to true when video ends to trigger fade-in
  }


  //dodaję funkcję dla logo - t
  scrollDown_t(): void {
  
    if (this.contentAnchor) {
      this.contentAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  
}

  
//   private subscription: Subscription = Subscription.EMPTY;
//   val=10;
//   constructor(private sharedService:SharedBetweenSiblingsService) { 
//     timer(5500).subscribe(() => (this.val = -1));
//   }

//   ngOnInit(): void {
//     this.subscription = this.sharedService.clickedButton$.subscribe(data => {
//         this.toggleDisplay(data)
//     AOS.init();
//     });
//   }

//   toggleDisplay(data: any) {
//     this.message = data;
//     this.showElement = !this.showElement;
//   }

//   playVideo() {
//     console.log('Logo clicked, attempting to trigger video...');
//     this.sharedService.triggerVideo(true);
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//     this.introEnded.emit(true);
    
//   }

 
  

// }


