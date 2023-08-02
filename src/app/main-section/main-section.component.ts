import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedBetweenSiblingsService } from './../shared-between-siblings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  message: string='';
  showElement = true;
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private sharedService:SharedBetweenSiblingsService) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.clickedButton$.subscribe(data => {
        this.toggleDisplay(data)

    });
  }

  toggleDisplay(data: any) {
    this.message = data;
    this.showElement = !this.showElement;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
