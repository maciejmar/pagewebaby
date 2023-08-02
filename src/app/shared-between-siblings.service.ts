import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedBetweenSiblingsService {

  private clickedButtonSource = new BehaviorSubject<any>(null);
  clickedButton$ = this.clickedButtonSource.asObservable();

  constructor() { }

  setClickedButton(data: any) {
    this.clickedButtonSource.next(data);
  }
}
