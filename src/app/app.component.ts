import { Component,Input, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pagewebaby';
  @Input() isToDisplay:boolean = false;
  @Input () introEnded: boolean = false;
}
