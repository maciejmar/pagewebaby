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
        description:"Anglojęzyczna wersja popularnej gry, w której bohaterem staje się chłopiec, który początkowo nie rokuje wielkich szans w byciu wybawcą swoich pobratymców. Po drodze spotykają go różne przygody, w których musi wykazać się zręcznością i pomysłowością.",
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
      },
      {
        name: "Basketball shots",
        slug: "basketball-shots",
        isPwa: true,
        category: [
          "Sportowa",
          "Zręcznościowa"
        ],
        
        age:"3",
        image:"./../../assets/basketShotsWebaby.jpg",
        description:"Mecz rzutów do kosza. Gracz może grać ze sobą lub z komputerem. Trzy poziomy trudności. Każda drużyna ma pięciu zawodników. Każdy z zawodników rzuca pięć razy.",
        price:12,
        createdAt: Date.now()
      },
      {
        name: "System of equations",
        category: [
          "Użytkowa",
          "Kalkulator"
        ],
        age:"3",
        image:"./../../assets/system-of-equations-image.png",
        description:"Rozwiązywanie układów równań liniowych z wieloma niewiadommymi. Aplikacja pozwala rozwiązywać układy siedmiu równań. Wystarczy podać współczynniki przy niewiadomych w każdym równaniu i wyrazy wolne",
        price:12,
        createdAt: Date.now()
      },
      {
        name: "Bubble word",
        category: [
          "Edukacyjna",
          "Zręcznościowa"
        ],
        age:"3",
        image:"./../../assets/bubble-graphics.png",
        description:"Gra edukacyjno-zręcznościowa, polegająca na rozbijaniu baniek niosących literki. Gracz ma za zadanie w jak najkrótszym czasie ułożyć litery, w jak najwięcej słów",
        price:12,
        createdAt: Date.now()
      }


    ]
  }
   random_boolean = Math.random() < 0.5;
}
