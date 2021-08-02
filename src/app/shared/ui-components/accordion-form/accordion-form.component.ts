import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { AccordionFormService } from './accordion-form.service';

@Component({
  selector: 'app-accordion-form',
  templateUrl: './accordion-form.component.html',
  styleUrls: ['./accordion-form.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn() )],
  providers: [
    // Provide a value to be used by Angular's dependency injection
    // machanism to pass 
  ]
})
export class AccordionFormComponent implements OnInit {

  @Input() set formConfig( config: object){
    if(config){
      this.config = config;
      this.getHeaderFormConfig(this.config['expansion_form']);
      this.setDisabledPanels();
    }else{
      this.config = null
    }
  }

  get formConfig(){
    return this.config;
  }

  @Input() loading: boolean;
  @Input() iTables: object;
  @Output() actionEvent: EventEmitter<object> = new EventEmitter<object>();
  @Output() rowClickedEvent: EventEmitter<object> = new EventEmitter<object>();


  headerTab: object[];
  config: object;

  constructor() { 
    
  }

  ngOnInit() {
    this.resetAccordions();
  }

  get initialLoading(){
    return this.loading && true;
  }


  getHeaderFormConfig(formConfig){

    const panelsIndexs = Object.keys(formConfig.panels);
    let header = []; // o que sea object ??
    for(const panelId of panelsIndexs){
      const panel = formConfig.panels[panelId];

      header.push( {
        name: panelId,
        icon: panel.icon || '',
        text: panel.text || '',
        class: panel.class || ''
      })

    }

    this.headerTab = header;
  }

  setDisabledPanels(){
    for(let tab of this.headerTab){
      const tabName = tab['name'];
      let panel = this.formConfig['expansion_form'].panels[tabName];
      if( panel ){
        const subsection = Object.keys(panel.content)[0];
        if(panel.content[subsection].list.control.defaultData.length === 0){
          this.formConfig['expansion_form'].panels[tabName].disabled = true;
        }else{
          this.formConfig['expansion_form'].panels[tabName].disabled = false;
        }

      }
    }
  }

  customActionClicked(event, name, section){
    this.actionEvent.emit({
      data: event,
      name: name,
      section: section
    });
  }

  rowClicked(event, name, section){
    this.rowClickedEvent.emit({
      data: event,
      name: name,
      section: section
    });
  }

  resetAccordions(){
    // console.log('header', this.headerTab);
    for(let panel of this.headerTab){
      if(this.formConfig['expansion_form'].panels[panel['name']]){
        this.formConfig['expansion_form'].panels[panel['name']].expanded = false;
      }
    }
  }

  panelAction(event){
    this.actionEvent.emit(event);
  }

}
