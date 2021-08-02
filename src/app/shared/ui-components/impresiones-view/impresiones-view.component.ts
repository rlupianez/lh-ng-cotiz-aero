import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '@core/services/http/api.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-impresiones-view',
  templateUrl: './impresiones-view.component.html',
  styleUrls: ['./impresiones-view.component.scss']
})
export class ImpresionesViewComponent implements OnInit {

  path: string = '/listados/LIST_IMPRESIONES';
  tableConfig: object = {
    label: 'Impresiones',
    editable: false,
    selectable: true,
    control: {
        type: 'table',
        editable: true,
        items: {
            titulo: {
                label: 'Componentes',
                editable: false,
                cellStyle: 'text-left',
                control: {
                    type: 'text',
                }
            },
            ambos: {
                label: '',
                editable: true,
                control: {
                    type: 'slide',
                    tooltip: 'Ambos Cuerpos'
                },
                hideOnDisabled: true
            },
            acciones: {
              label: 'Descargar',
              editable: false,
              control: {
                  type: 'custom_action',
                  icon: 'files',
                  action: 'open_detail'
              }
            }
        },
        defaultData: [],
        columns: ['titulo', 'ambos', 'acciones'],
    }
  }

  list: any[] = [];
  iFormControl: FormGroup;
  loading: boolean = false;
  imprimirTodosLink: string;
  formArrayRow: FormGroup;
  impresiones: object[];

  constructor(
    public dialogRef: MatDialogRef<ImpresionesViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formService: FormsFactoryService,
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log('datos poliza', this.list);
    if(this.list){
      //this.iFormControl = new FormGroup({ 'list_impresiones' : this.fb.array(formArray)});
      this.getImpresiones();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  getImpresiones(){
    let filters = {
      p_poliza: this.data['poliza'],
      p_endoso: this.data['endoso'],
      p_cod_sec: this.data['cod_sec'],
      //p_nro_rie: this.data['nro_rie'],
      p_tipo_emi: this.data['tipo_emi'],
      p_solicitud: this.data['solicitud']
    };

    this.loading = true;
    this.apiService.post(this.path, filters, false).subscribe( res => {
      console.log('impresiones res', res);
      if(res['p_list_impresiones']){
        let config = this.tableConfig;
        this.imprimirTodosLink = res['p_list_impresiones'];
        config['control'].defaultData = res['p_list_impresiones'];        
        this.iFormControl = this.addRows(res['p_list_impresiones']);
        
        this.imprimirTodosLink = res['p_lnk_todos'];
        this.tableConfig = { ...config };
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }

  openImpresion(data){
    console.log('impresion', data);
    if(data['row']['link']){
      let link = data['row']['link'];
      let list = this.iFormControl.get('list_impresiones') as FormArray;
      if(list.controls[data.index].get('ambos').value){
        link = link + data.row.check_ambos_cuerpos;
      }else{
        link = link + data.row.check_cuerpo;
      }
      window.open(link, '_blank');
    }
  }

  openImprimirTodos(){
    if(this.imprimirTodosLink){
      window.open(this.imprimirTodosLink, '_blank');
    }
  }

  addRows(list){
    const length = list.length;
    let control = this.formService.createForm({ list_impresiones: this.tableConfig });
    let array = control.get('list_impresiones') as FormArray;
    for(let i=0; i < length; i++){
      let row = this.formService.getFormArray(this.tableConfig['control']);

       // si ambos cuerpos esta vacio, se debe ocultar el campo
      // al ponerlo disabled se oculta
      let control = row.get('ambos');
      if(!list[i]['check_ambos_cuerpos']){
        control.disable();
      }else{
        control.enable();
      }

      array.push(row);
    }

    return control;
  }

}
