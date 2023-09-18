import { Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import AOS from "aos";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('0.5s')
      ])
    ])
  ]
})
export class GameComponent implements AfterViewInit {
  @ViewChild('target') target!: ElementRef;

  buttonsState: 'hidden' | 'visible' = 'hidden';
  grayImage = './../../assets/cover-45.2-grayscale.png';
  colorImage = './../../assets/cover-45.2.png';
  maskHeight = 0;
  imageWidth = 100;
  imageHeight: number; // This depends on the aspect ratio
  viewBox!: string;
  cardTable=[{
    'name':'Game Description',
    'bgc':'card-yellow'
  },{
    'name':'Next releases',
    'bgc':'card-red'
  },{
    'name':'Best practices',
    'bgc':'card-cyan'
  },{
    'name':'Tips & Tricks',
    'bgc':'card-violet'
  }]

  constructor() {
    // Assuming an initial aspect ratio of 4:3 as an example
    this.imageHeight = (3 / 4) * this.imageWidth;
    this.viewBox = `0 0 ${this.imageWidth} ${this.imageHeight}`;
}
animateMask():void {
      if (this.maskHeight < this.imageHeight) {
        this.maskHeight += (3 / 4) * 0.2; 
        requestAnimationFrame(() => this.animateMask());
      } else {
        // Trigger the button appearance after grayscale image is fully revealed
        this.buttonsState = 'visible';
      }
    }  
  ngAfterViewInit(): void {
    this.animateMask();
    this.viewBox = `0 0 ${this.imageWidth} ${this.imageHeight}`;
    this.animateMask();
    this.imageHeight = (3 / 4) * this.imageWidth;
    AOS.init();
  }


  scrollToElement(element: HTMLDivElement): void {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


}



