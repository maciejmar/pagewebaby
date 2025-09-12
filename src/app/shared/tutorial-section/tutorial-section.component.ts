import { Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { FadeInOnScrollDirective } from '../directives/fade-in-on-scroll.directive';

@Component({
  selector: 'app-tutorial-section',
  standalone: true,
  imports: [NgIf, NgClass, FadeInOnScrollDirective],
  templateUrl: './tutorial-section.component.html',
  styleUrls: ['./tutorial-section.component.scss']
})
export class TutorialSectionComponent {
  @Input() title = '';
  @Input() alt = '';
  @Input() caption = '';
  @Input() reverse = false;

  // single internal source for the image
  src = '';

  // accept any of these and route to `src`
  @Input() set img(v: string | null | undefined)   { this.src = v ?? this.src; }
  @Input() set image(v: string | null | undefined) { this.src = v ?? this.src; }
  @Input() set srcInput(v: string | null | undefined) { this.src = v ?? this.src; } // optional extra alias
}
