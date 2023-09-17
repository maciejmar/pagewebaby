import { Component, OnInit } from '@angular/core';
import {Game} from '../game'
import AOS from "aos";

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
      image: "./../../assets/cover-45.2.png",
      description:"Przygody chłopca, który ratuje swoją krainę przed zagładą. Podczas brawurowej wyprawy po zaginione litery sam doznaje przemiany w dobrego, odważnego młodzieńca.",
      price:12,
      createdAt: Date.now()
      },
      {
       name: "Kto złapie miśka",
        category: [
          "Arcade",
          "Zręcznościowa"
        ],
        age:"9",
        image:"./../../assets/landscapeGO.png",
        description:"Niedźwiedź Lutek wybiera się w niebezpieczną podróż by zdobyć pożywienie dla swej rodziny. Po drodze spotykają go różne przygody, w których musi wykazać się zręcznością i pomysłowością.",
        price:12,
        createdAt: Date.now()
      },
      {
        name: "Rybki uciekają",
        category: [
          "Sensoryczna",
          "Zręcznościowa"
        ],
        age:"3",
        image:"./../../assets/mis.png",
        description:"Polem gry jest akwarium podzielone na kwadraty. W kolejnych kwadratach pojawiają się rybki, którymi trzeba kierować, żeby trafiły tam gdzie chcemy. Gracz wygrywa, jeśli uda mu się zagonić wszystkie rybki do domku-muszli.",
        price:12,
        createdAt: Date.now()
      }


    ]
  }
   random_boolean = Math.random() < 0.5;

}
