import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  
  @Output() blur = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event){
    this.blur.emit(event);
  }

}
