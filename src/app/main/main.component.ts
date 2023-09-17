import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isTrue = false;
  showVideoPlayer = true;

  handleVideoEnd() {
    this.showVideoPlayer = false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
