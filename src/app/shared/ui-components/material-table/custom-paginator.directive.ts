import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[loadMorePaginator]'
})
export class CustomPaginatorDirective {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    // console.log('load more directive', this.el);
    this.el.nativeElement.querySelector('.mat-paginator-navigation-previous').hidden = true;
    this.el.nativeElement.querySelector('.mat-paginator-navigation-next').hidden = true;
  }
}
