import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[scrollToInShadow]',
    standalone: false
})
export class ScrollToInShadowDirective {
  @Input('scrollToInShadow') targetId = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    e.preventDefault();
    const id = this.targetId.trim();
    if (!id) return;

    const root = this.el.nativeElement.getRootNode() as Document | ShadowRoot;

    const byId = (root as any).getElementById?.bind(root);
    const target =
      (byId ? byId(id) : null) ??
      root.querySelector('#' + ((window as any).CSS?.escape?.(id) ?? id))

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
