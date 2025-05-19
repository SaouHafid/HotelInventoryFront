import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]' // Use this selector to apply the directive
})
export class HoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Listen for mouseenter event to change background color
  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor('lightgrey');
  }

  // Listen for mouseleave event to reset background color
  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor('');
  }

  // Helper method to change the background color
  private changeBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
