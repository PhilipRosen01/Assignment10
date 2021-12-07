import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverStyle]'
})
export class HoverStyleDirective {
  @Input() hoverStyle: any;
  constructor(private elm: ElementRef) {

  }
  @HostListener('mouseenter') onMouseEnter() {
    if (this.hoverStyle === "text-decoration") {
      this.elm.nativeElement.style.textDecoration = "underline";
    }
    else if (this.hoverStyle === "font-weight") {
      this.elm.nativeElement.style.fontWeight = "bold";
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.hoverStyle === "text-decoration") {
      this.elm.nativeElement.style.textDecoration = "initial";
    }
    else if (this.hoverStyle === "font-weight") {
      this.elm.nativeElement.style.fontWeight = "normal";
    }
  }

}
