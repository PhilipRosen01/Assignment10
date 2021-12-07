import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverCard]'
})
export class HoverCardDirective {
  @Input() borderVisible: boolean;
  currentBorder: string;
  constructor(private elm: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.borderVisible) {
      this.currentBorder = this.elm.nativeElement.style.border;
      this.elm.nativeElement.style.border = "5px dotted #ffff00";
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.borderVisible) {
      this.elm.nativeElement.style.border = this.currentBorder;
    }
  }


}
