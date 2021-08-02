import { Component, AfterViewInit, Input, Output, OnChanges, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cobertura, CoberturasDataSet } from './models/cobertura';


@Component({
  selector: 'app-cobertura-seleccionada',
  templateUrl: './cobertura-seleccionada.component.html',
  styleUrls: ['./cobertura-seleccionada.component.scss'],
  providers: []
})
export class CoberturaSeleccionadaComponent  implements AfterViewInit  {   
  @Input() cobertura: Cobertura;
  @Output() coberturaAdded = new EventEmitter<Cobertura>(); 
  @Output() sumarPlaza = new EventEmitter<Cobertura>(); 
  @Output() nuevaSumaAsegurada = new EventEmitter<Cobertura>();   
  @ViewChild('coberturaForm') coberturaForm: NgForm;
  coberturasSeleccionadas: Array<Cobertura> = [];

  public ngxCurrencyOptions = {
    prefix: '$ ',
    thousands: '.',
    decimal: ',',
    inputMode: 'NATURAL'
  };
     
  constructor( )  { 
    
  }


  ngAfterViewInit() {           
    this.coberturaForm.valueChanges.subscribe(e => {
     // this.cobertura.valid = this.coberturaForm.valid;      
    });    
  }

  agregarCobertura(cobertura: Cobertura, $event){
    this.coberturaAdded.emit(this.cobertura);

  }

  sumarPlazas(tazas: Cobertura){
    this.sumarPlaza.emit(tazas);
  }

  cambioSumaAsegurada(cobertura: Cobertura){
    this.nuevaSumaAsegurada.emit(cobertura);
  }


}