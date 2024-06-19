import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizeFont]'
})
export class ResizeFontDirective implements OnInit {
  private element: HTMLElement;

  @Input('appResizeFont') ratio: number = 20; // Default ratio is 1/20

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.adjustFontSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustFontSize();
  }

  private adjustFontSize() {
    const width = this.element.clientWidth;
    const fontSize = width / this.ratio; // Here i have to calculate font size based on the  % ratio %
    this.element.style.fontSize = `${fontSize}px`;
  }
}
