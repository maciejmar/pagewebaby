import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { Subscription,timer } from 'rxjs';
import AOS from 'aos';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  message: string='';
  showElement = true;
  @Output() introEnded= new EventEmitter<boolean>();
  
  private subscription: Subscription = Subscription.EMPTY;
  val=10;
  constructor(private sharedService:SharedBetweenSiblingsService) { 
    timer(5500).subscribe(() => (this.val = -1));
  }

  ngOnInit(): void {
    this.subscription = this.sharedService.clickedButton$.subscribe(data => {
        this.toggleDisplay(data)
    AOS.init();
    });
  }

  toggleDisplay(data: any) {
    this.message = data;
    this.showElement = !this.showElement;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.introEnded.emit(true);
    
  }



}
