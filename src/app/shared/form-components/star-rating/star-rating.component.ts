import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mat-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {

  @Input() controlOptions: any;
  @Input() iFormControl: FormControl;

  @Input('rating') public rating: number;
  @Input('starCount') public starCount: number;
  @Input('color') public color: string;
  @Output() public ratingUpdated = new EventEmitter();

  formOptions: object;

  public ratingArr = [];

  constructor() {

  }

  ngOnInit() {

    this.formOptions = this.controlOptions;
    this.starCount = this.controlOptions['control'].starCount || 3;
    this.rating = this.controlOptions['control'].rating || 0;
    this.color = this.controlOptions['control'].color || 'primary';
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }


  get options() {
    return this.controlOptions.control['options'] || [];
  }

  onClick(rating: number) {
    if (rating == this.rating) {
      this.rating = 0;
    } else {
      this.rating = rating;
    }

    this.iFormControl.setValue(rating);
    return false;
  }

  get labelHidden() {
    return this.controlOptions.hideLabel;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showDescription(index: number) {
    var array = this.formOptions["control"]["config"]["map"];
    return array.find(q => q.star == index).description;
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
