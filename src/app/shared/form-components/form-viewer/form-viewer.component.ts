import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { config } from '@core/config/app-config';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';

declare var $:any;


@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn() )]
})
export class FormViewerComponent implements OnInit, AfterViewInit {

  @Input() formConfig: object; 
  @Input() formData: any = null; 
  @Input() loading: boolean = true;

  constructor() { }

  ngOnInit() {
    

  }

  ngAfterViewInit(){
    //$('[data-tooltip="tooltip"]').tooltip();
  }

  get fields(){
    return this.formConfig['fields'] || {};
  }

  get data(){
    if(!this.formData){
      return {};
    }
    return typeof this.formData === 'object' ? this.formData : this.formData[0];
  }

  get initialLoading(){
    return this.loading && config.ux.skeletonLoadingEnable;
  }

  get isEmpty(){
    return !this.formData; 
  }

  hoverInText(){
    //$('[data-tooltip="tooltip"]').tooltip();
  }

  hoverOutText(){
    //let tooltip =  $('[data-tooltip="tooltip"]');
    //tooltip.destroy();
  }

}
