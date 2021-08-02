import { Component, OnInit, Input } from '@angular/core';
import { config } from '@core/config/app-config';

import { SkeletonfadeOut, SkeletonfadeIn, fadeInAnimation } from '@core/animations/router.animations'
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-form-control-skeleton-loader',
  templateUrl: './form-control-skeleton-loader.component.html',
  styleUrls: ['./form-control-skeleton-loader.component.scss'],
  animations: [ 
    trigger('fadeIn', SkeletonfadeIn()), 
    trigger('fadeOut', SkeletonfadeOut())
  ]
})
export class FormControlSkeletonLoaderComponent implements OnInit {

  enabled: boolean = false;
  @Input() show: boolean;

  constructor() { 
    
  }

  ngOnInit() {
    this.enabled = config.ux.skeletonLoadingEnable || this.show;
  }

}
