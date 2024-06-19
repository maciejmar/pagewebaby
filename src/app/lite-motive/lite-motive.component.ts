import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-lite-motive',
  templateUrl: './lite-motive.component.html',
  styleUrls: ['./lite-motive.component.scss'],animations: [
    trigger('bounceInOut', [
      state('small', style({
        fontSize: '20px',
        color: 'white'
      })),
      state('large', style({
        fontSize: '40px',
        color: 'white'
      })),
      state('target', style({
        fontSize: '30px'
      })),
      transition('small => large', [
        animate('0.5s')
      ]),
      transition('large => target', [
        animate('0.5s')
      ])
    ])
  ]
})

export class LiteMotiveComponent implements OnInit {
  text = 'Gateway To Games';
  letters!: string[];

  constructor() { }

  
    animationState = 'small';

    ngOnInit() {
      this.letters = this.text.split('');
      setTimeout(() => {
        this.animationState = 'large';
        setTimeout(() => {
          this.animationState = 'target';
        }, 500); // Time must match the transition duration
      }, 500); // Initial delay for starting the animation
    }
  
}
