import { Component, OnInit, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { QuestionDataService } from './services/question-data.service';
import { QuestionDataFieldEnum } from './services/question-data.interfaces';
import { BaseDataComponent } from '@shared/services/child-base.component';

@Component({
  selector: 'question-data-form',
  templateUrl: './question-data.component.html',
  styleUrls: ['./question-data.component.scss'],
  providers: []
})
export class QuestionDataComponent implements BaseDataComponent {

  @Input() fields: any;
  @Output() handleChange = new EventEmitter<any>();
  @Input() name: String;
  @Input() model: any;

  constructor(
    public questionDataService: QuestionDataService) { }


  ngOnInit() {
    this.initService();
  }

  initService() {
    this.questionDataService.initPanel(true);
    this.questionDataService.formGroup.valueChanges.subscribe(value => {
      this.handleChange.emit({ key: this.name, value: value });
    });
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

  }
}
