import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isTrue = false;
  showVideoPlayer = false;

  
  constructor() { }

  ngOnInit(): void {
  }

  

  playVideo(): void {
    this.showVideoPlayer = true;
  }

  handleVideoEnd(): void {
    this.showVideoPlayer = false;
  }

}
