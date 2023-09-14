import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  @Output() introEnded= new EventEmitter<boolean>();
 
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnDestroy():void{
    this.introEnded.emit(true);
  }
}
