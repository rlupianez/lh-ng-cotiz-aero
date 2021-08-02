import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sub-panel-form',
  templateUrl: './sub-panel-form.component.html',
  styleUrls: ['./sub-panel-form.component.scss']
})
export class SubPanelFormComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() subtitle: string;
  ngOnInit() {

  }
}
