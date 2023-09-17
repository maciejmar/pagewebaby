import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  grayImage = './../../assets/cover-45.2-grayscale.png';
  colorImage = './../../assets/cover-45.2.png';
  maskHeight = 0;
  imageWidth = 100;
  imageHeight: number; // This depends on the aspect ratio
  viewBox!: string;

  constructor() {
    // Assuming an initial aspect ratio of 4:3 as an example
    this.imageHeight = (3 / 4) * this.imageWidth;
    this.viewBox = `0 0 ${this.imageWidth} ${this.imageHeight}`;
}

  ngOnInit(): void {
  
  this.animateMask();
  this.viewBox = `0 0 ${this.imageWidth} ${this.imageHeight}`;
  this.animateMask();
  this.imageHeight = (3 / 4) * this.imageWidth;
}


animateMask(): void {
  if (this.maskHeight < this.imageHeight) {
    this.maskHeight += (3 / 4) * 0.2; // Adjust for desired animation speed with respect to aspect ratio
    requestAnimationFrame(() => this.animateMask());
  }
}
}
