import { Component, OnInit } from '@angular/core';
import {Game} from '../game'
import AOS from "aos";
import { ResizeFontDirective } from '../resize-font.directive';

@Component({
  selector: 'app-game-badge',
  templateUrl: './game-badge.component.html',
  styleUrls: ['./game-badge.component.scss']
})
export class GameBadgeComponent implements OnInit {
  gameimg = "./../../assets/NicponRunWithSword.png";
  gamesjson:Game[]=[]
  

  constructor() {}
 

  ngOnInit(): void {
      
      AOS.init();
      this.gamesjson =[ {
      name: "Abecadłowo \nZagubione literki",
      category: [
        "Przygodowa",
        "Edukacyjna"
      ],
      age:"7-100",
      image: "./../../assets/nicpon-10a.jpg",
      description:"Przygody chłopca, który ratuje swoją krainę przed zagładą. Podczas brawurowej wyprawy po zaginione litery sam doznaje przemiany w dobrego, odważnego młodzieńca.",
      price:12,
      createdAt: Date.now()
      },
      {
       name: "ABC-land wersja anglojęzyczna",
        category: [
          "Przygodowa",
          "Edukacyjna"
        ],
        age:"9",
        image:"./../../assets/nicpon6b.jpg",
        description:"Anglojęzyczna wersja popularnej gry, w której bohaterem staje się chłopiec, który początkowo nie rokuje wielkich szans w byciu wybawcą swoich pobraymców. Po drodze spotykają go różne przygody, w których musi wykazać się zręcznością i pomysłowością.",
        price:12,
        createdAt: Date.now()
      },
      {
        name: "Buchstabenland - wersja niemieckojęzyczna",
        category: [
          "Przygotowa",
          "Edukacyjna"
        ],
        age:"3",
        image:"./../../assets/nicpon8b.jpg",
        description:"Abecadłowo w wesji niemieckojęzycznej. Nicpoń musi uratować swoją krainę, ale by tego dokonać musi odbyć daleką podróż w nieznane. Oprócz wrogów i wysłanników złego władcy Sarsenbaja napotka też na szczęście tych, którzy staną się jego przyjaciółmi",
        price:12,
        createdAt: Date.now()
      }


    ]
  }
   random_boolean = Math.random() < 0.5;

}
