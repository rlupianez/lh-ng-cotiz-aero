import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccordionFormService {

  headerTab : object[];

  constructor() { }

  setDisabledPanels(config: object){
    this.getHeaderFormConfig(config);

    for(let tab of this.headerTab){
      const tabName = tab['name'];
      let panel = config['expansion_form'].panels[tabName];
      if( panel ){
        const subsection = Object.keys(panel.content)[0];
        if(panel.content[subsection].list.control.defaultData.length === 0){
          config['expansion_form'].panels[tabName].disabled = true;
        }else{
          config['expansion_form'].panels[tabName].disabled = false;
        }

      }
    }

    return config;

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
}
