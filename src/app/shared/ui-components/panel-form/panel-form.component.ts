import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.scss']
})
export class PanelFormComponent implements OnInit {

  constructor() { }

  @Input() showBtnPrimary: boolean;
  @Input() showBtnSecondary: boolean;
  @Input() disabledBtnPrimary: boolean;
  @Input() disabledBtnSecundary: boolean;
  @Input() title: string;
  @Input() btnLabelPrimary: string;
  @Input() btnLabelSecondary: string;
  @Output() eventActionPrimary = new EventEmitter<any>();
  @Output() eventActionSecondary = new EventEmitter<any>();
  @Input() classPanel: string;
  @Input() isDisabled: boolean;
  
  ngOnInit() {

  }

  actionPrimary($event) {
    this.eventActionPrimary.emit($event);
  }

  actionSecondary($event) {
    this.eventActionSecondary.emit($event);
  }
}
