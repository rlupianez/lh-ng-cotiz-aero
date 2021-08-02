import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExpansionPanelService } from '@core/services/components/expansion-panel.service';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import * as animations from '@core/animations/router.animations';

@Component({
  selector: 'app-dynamic-container',
  templateUrl: './dynamic-container.component.html',
  styleUrls: ['./dynamic-container.component.scss'],
  viewProviders: [
    MatExpansionPanel
  ],
  // animations: [ trigger('fadeIn',animations.SkeletonfadeIn()) ]
})
export class DynamicContainerComponent implements OnInit, OnDestroy, AfterViewChecked{

  @Input() formConfig: object;
  @Input() formGroup: FormGroup;

  private currentPanelSelected: string;
  private panelSubscription: Subscription = new Subscription();

  constructor(private panelService: ExpansionPanelService, private cdr: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.panelSubscription = this.panelService.getExpansionPanelNotifications().subscribe(
      panelItem => {
        this.currentPanelSelected = panelItem;
      }
    );
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  ngOnDestroy(){
    this.panelSubscription.unsubscribe();
  }

  itemPanelSelected(panelName: string, expanded: boolean){
    if(expanded){
      this.panelService.setPanelItem(panelName);
      this.currentPanelSelected = panelName;
      this.formConfig[panelName].expanded = expanded;
    }else{
      if(this.currentPanelSelected === panelName){
        this.panelService.setPanelItem(null);
        this.currentPanelSelected = null;
        this.formConfig[panelName].expanded = expanded;
      }
    }
  }

  hideControl(hiddenOpts: boolean | object){
    
    if(!hiddenOpts){
      return false;
    }
    
    if(typeof hiddenOpts === 'boolean'){
      return hiddenOpts;
    }

    if(typeof hiddenOpts === 'object'){
      
    }
  }
}
