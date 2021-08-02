import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as animations from '@core/animations/router.animations'
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-acciones-nav',
  templateUrl: './acciones-nav.component.html',
  styleUrls: ['./acciones-nav.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn() )]
})
export class AccionesNavComponent implements OnInit {

  @Input() items: object;
  @Input() loading: boolean;
  @Output() actionClicked: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  get initialLoading(){
    return this.loading && true;
  }

  action(name, itemData){
    this.actionClicked.emit({
      actionName: name,
      data: itemData
    })
  }

}
