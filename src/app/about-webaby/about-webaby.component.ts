import { Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-about-webaby',
  templateUrl: './about-webaby.component.html',
  styleUrls: ['./about-webaby.component.scss']
})
export class AboutWebabyComponent implements OnInit {
   @ViewChild('scene', { static: true }) sceneRef!: ElementRef<HTMLElement>;
  constructor() { }

  ngOnInit(): void {
  }
   private clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
  }

  onParallaxMove(ev: PointerEvent) {
    const el = this.sceneRef?.nativeElement;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // wektor od środka do kursora
    const dx = ev.clientX - cx;
    const dy = ev.clientY - cy;

    // normalizacja do [-1, 1]
    const nx = this.clamp(dx / (rect.width / 2), -1, 1);
    const ny = this.clamp(dy / (rect.height / 2), -1, 1);

    // maksymalne wychylenia (stopnie)
    const maxX = 8;  // „kiwanie” w osi X
    const maxY = 10; // „kiwanie” w osi Y

    const rx = (-ny * maxX).toFixed(2) + 'deg'; // odwróć Y (intuicyjny ruch)
    const ry = ( nx * maxY).toFixed(2) + 'deg';

    el.style.setProperty('--rx', rx);
    el.style.setProperty('--ry', ry);
  }

  resetParallax() {
    const el = this.sceneRef?.nativeElement;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  // bonus: reset przy zmianie rozmiaru
  @HostListener('window:resize')
  onResize() { this.resetParallax(); }

}
