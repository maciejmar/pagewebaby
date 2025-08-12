import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeFontDirective } from './../resize-font.directive';


@NgModule({
  declarations: [ResizeFontDirective],
  imports: [CommonModule],
  exports: [ResizeFontDirective]
})
export class SharedModule {}