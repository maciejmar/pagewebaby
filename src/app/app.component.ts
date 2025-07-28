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

  ngOnInit(): void {
  document.addEventListener('mousemove', (e) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    const layer = document.querySelector('.spotlight-layer') as HTMLElement;

    if (layer) {
      layer.style.setProperty('--x', x);
      layer.style.setProperty('--y', y);
    }
  });
 }
}
