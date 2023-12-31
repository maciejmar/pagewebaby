import { Component, AfterViewInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-campaign-motto',
  templateUrl: './campaign-motto.component.html',
  styleUrls: ['./campaign-motto.component.scss']
})
export class CampaignMottoComponent implements AfterViewInit {
  word = 'Enter into the Game';
  displayedLetters: string[] = [];
  isDOMLoaded = false;

  constructor() { }

  ngAfterViewInit(): void {
    this.isDOMLoaded = true;
    AOS.init();
    this.displayLetterByLetter();
    


    
    
  }
   

   displayLetterByLetter(): void {
    this.word.split('').forEach((letter, index) => {
      setTimeout(() => {
        this.displayedLetters.push(letter);
      }, index * 350);  // 200ms delay for each letter
    });
  }
}
