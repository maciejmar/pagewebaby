import { ElementRef } from '@angular/core';
import { ResizeFontDirective } from './resize-font.directive';

describe('ResizeFontDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const directive = new ResizeFontDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});