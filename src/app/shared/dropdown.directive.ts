import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') isOpen = false;
  constructor(private elementRef: ElementRef) {}
  ngOnInit() {}
  // 點其他地方會關掉toggle，綁到document去
  @HostListener('document:click', ['$event']) click(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
