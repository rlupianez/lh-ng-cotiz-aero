import { Directive, HostListener, ElementRef, AfterViewInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appEllipsisText]'
})
export class EllipsysTextDirective implements AfterViewInit {
  domElement: any;
  @Input() tooltipId: string;


  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement; // to get DOM element and store it in global variable
    // setting compulsory required styles to the DOM element
    const elipsifyme = {
      'text-overflow': 'ellipsis',
      'overflow': 'hidden',
      'white-space': 'nowrap',
    };
    Object.keys(elipsifyme).forEach(newStyle => {
      this.renderer.setStyle(
        this.domElement, `${newStyle}`, elipsifyme[newStyle]
      );
    });
  }

  // to check and add title attribute on the element at the time when application renders first time. 
  ngAfterViewInit(): void {
    // to see effect try removing below two lines and check if the title is added at the first time rendering.   
    this.renderer.setProperty(this.domElement, 'scrollTop', 1);
    this.isTitleAttribute();
  }

  @HostListener("window:resize", ["$event.target"])
  isTitleAttribute() {
    //console.log('tooltip id', this.tooltipId);
    // to add or remove title attribute on the element when it is changing width.
    if(this.domElement.offsetWidth < this.domElement.scrollWidth) {
      // console.log('offset menos scroll ',  this.tooltipId);
      this.renderer.setAttribute(this.domElement, 'title', this.domElement.textContent);
    }else{
      //console.log('offset mayor scroll ');
      this.renderer.removeAttribute(this.domElement, 'title');
    }
      
      
  }

}
