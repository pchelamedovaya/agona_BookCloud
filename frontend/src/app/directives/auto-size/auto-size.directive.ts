import { Directive, ElementRef, HostListener, OnInit } from '@angular/core'

@Directive({
  selector: '[appAutoSize]'
})
export class AutoSizeDirective implements OnInit {

  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    this.adjust();
  }

  ngOnInit(): void {
    this.adjust();
  }

  adjust(): void {
    const textarea = this.el.nativeElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

}
