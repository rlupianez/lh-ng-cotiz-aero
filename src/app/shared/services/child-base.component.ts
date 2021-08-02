import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';

export abstract class BaseDataComponent implements OnInit {
  ngOnInit(): void {
    this.initService();
  }

  abstract initService();
  abstract ngAfterViewInit();
  abstract ngOnDestroy();

}
