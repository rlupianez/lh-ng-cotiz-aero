import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';


import * as moment from 'moment';
import * as $ from 'jquery';
import { ApiService } from './http/api.service';

@Injectable({
  providedIn: 'root'
})
export class FileDownloaderService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  downloadFile(url: string) {
    $.ajax({
      dataType: 'native',
      url: url,
      xhrFields: {
        responseType: 'blob'
      },
      success: function(blob){
        console.log(blob.size);
          /*var link=document.createElement('a');
          link.href=window.URL.createObjectURL(blob);
          link.download="Dossier_" + new Date() + ".pdf";
          link.click();*/
      }
    });

    /* $.ajax({
      cache: false,
      type: 'POST',
      url: url,
      contentType: false,
      processData: false,
      data: {},
       //xhrFields is what did the trick to read the blob to pdf
      xhrFields: {
          responseType: 'blob'
      },
      success: function (response, status, xhr) {
        console.log()
      }
    }); */
  }
    
  filterData(data: object[], columns: object){
    let dataFiltered = [];
    let columnsFields = Object.keys(columns);

    for(let item of data){

      for(let field of Object.keys(item)){

        const removeFields = ['lnk_rep','select','lnk_rep_r','lnk_rep_d'];

        // si existe en removeFields o si no existe dentro de array de campos de las columnas
        if(removeFields.indexOf(field) !== -1 || columnsFields.indexOf(field) === -1){
          delete item[field];
        }

      }
      
      dataFiltered.push(item);
    }

    return dataFiltered;
  }

  generateFilename(listname: string, filterData: object){
    let filename = listname;
    let filternames = Object.keys(filterData);

    for(let filter of filternames){

      if(filter.indexOf('_desde') !== -1){
        filename += '-' + filterData[filter];
      }

      if(filter.indexOf('_hasta') !== -1){
        filename += '-' + filterData[filter];
      }

    }

    return filename;
  }

  getExcelHeaders(columns: object){
    const headers = [];
    const names = Object.keys(columns);

    for(let name of names ){
      if(name !== 'descargar' && name !== 'select'){
        headers.push(columns[name].label);
      }
    }
    return headers;
  }

  


  exportToCsv(data: object[], filename: string, columnsData: object){
    let defaultFilename = moment().format('DDMMYYYY');
    const headers = this.getExcelHeaders(columnsData);
    const filteredData = this.filterData(data, columnsData);

    if(filename){
      defaultFilename = `${filename}-${defaultFilename}`;
    }

    new Angular5Csv(filteredData, defaultFilename, {
      headers: headers
    });
  }

  downloadSelectedPDF(items: any[]){
    const url = '/listados/LIST_REPORTES';

    let body = {
      p_urls: []
    };

    for(const row of items){

      const item = {
        identificador: 'a',
        url: row['lnk_reporte']
      };

      body.p_urls.push(item);

    }

   
    return this.apiService.postPDF(url, body);

  }

}
