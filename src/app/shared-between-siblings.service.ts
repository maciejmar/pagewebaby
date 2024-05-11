import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedBetweenSiblingsService {

  private clickedButtonSource = new BehaviorSubject<any>(null);
  private videoPlayState = new BehaviorSubject<boolean>(false);
  clickedButton$ = this.clickedButtonSource.asObservable();

  constructor() { }

  setClickedButton(data: any) {
    this.clickedButtonSource.next(data);
  }

  triggerVideo(state: boolean) {
    console.log('Triggering video play:', state);
    this.videoPlayState.next(state);
  }

 

  getVideoState() {
    return this.videoPlayState.asObservable();
  }
}
