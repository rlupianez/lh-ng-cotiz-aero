import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-quote-total',
  templateUrl: './life-quote-total.component.html',
  styleUrls: ['./life-quote-total.component.scss']
})
export class LifeQuoteTotalComponent implements OnInit {

  @Input() prima: number;
  @Input() sumaAsegurada: number;
  @Input() premio: number;
  
  constructor() { }

  ngOnInit() {
  }

}
