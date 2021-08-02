import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ASEGURADOBASICO } from './mock-asegurado-basico';
import { AseguradoBasico } from './asegurado-basico.model';
import { ApiService } from '@core/services/http/api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AseguradoBasicoService {

  private readonly uriAsegLavado: string = '/listados/LIST_ASEG_LAVADO';
  private readonly uriListDocumentacionLavado: string = '/listados/LIST_DOCUMENTACION_LAVADO';
  private readonly uriListDocumentacionDocumentos: string = '/listados/LIST_ARCHIVOS_LAVADO';
  private readonly uriListAseg: string = '/listados/LIST_ASEG';
  private readonly uriListAsegDetLavado: string = '/listados/LIST_ASEG_DET_LAVADO';
  private readonly uriListAsegSecLavado: string = '/listados/LIST_ASEG_SEC_LAVADO';
  private readonly uriUpdateDocumentacion: string = '/listados/ACTUALIZA_ESTADO_DOC_LAVADO';
  private readonly uriSaveDocumentacion: string = '/listados/GUARDAR_DOCUMENTACION_LAVADO';
  private readonly uriDeleteDocumentacion: string = '/listados/BAJA_ARCHIVO_DOC_LAVADO';
  private readonly uriUpdateDocumentacionSuficiente: string = '/listados/ACTUALIZA_SUFICIENTE_ASEG';
  private readonly uriUpdateObservaciones: string = '/listados/ACTUALIZA_OBS_ASEG';
  private readonly uriUpdateAnalisis: string = '/listados/ACTUALIZA_ANALISIS_ASEG';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<AseguradoBasico[]> {
    return of(ASEGURADOBASICO);
  }

  getProductor(_query: object): Observable<object[]> {
    return of([{}]);
  }

  getAsegurado(id: string) {
    return this.apiService.post(this.uriListAseg, {
      p_cod_asegurado: id,
      p_nropag: 0,
      p_regxpag: 30
    }, false);
  }

  getAseguradosLavadoActivo(filterModel: object, parseResponse: boolean = true) {
    return this.apiService.post(this.uriAsegLavado, filterModel, parseResponse).pipe(map(data => {
      this.formatearAsegurado(data);
      return data;
    }));

  }

  getAseguradoLavadoActivo(cod_asegurado: number) {
    return this.apiService.post(this.uriAsegLavado, {
      p_buscar: cod_asegurado,
      p_nropag: 0,
      p_regxpag: 25
    }).pipe(map(data => {
      this.formatearAsegurado(data);
      return data;
    }));
  }

  updateAseguradoDocSuficiente(cod_asegurado: string, fieldName: string, fieldValue: any) {
    var url = this.uriUpdateDocumentacionSuficiente;
    switch (fieldName) {
      case 'p_suficiente':
        fieldValue = fieldValue ? 'S' : 'N';
        url = this.uriUpdateDocumentacionSuficiente;
        break;
      case 'p_observaciones':
        url = this.uriUpdateObservaciones;
        break;
      case 'p_analisis':
        url = this.uriUpdateAnalisis;
        break;
    }

    return this.apiService.post(url, {
      p_cod_asegurado: cod_asegurado,
      p_o_presentacion: 1,
      [fieldName]: fieldValue
    });
  }

  getAseguradosSecLavado(cod_asegurado: string,) {
    return this.apiService.post(this.uriListAsegSecLavado, {
      p_cod_asegurado: cod_asegurado,
      p_limit: 1000,
      p_nropag: 0,
      p_regxpag: 30
    });
  }

  getUriAseguradosLavadoActivo() {
    return this.uriAsegLavado;
  }

  getAseguradosPoliza(cod_asegurado: string, cod_sec: string,) {
    return this.apiService.post(this.uriListAsegDetLavado, {
      p_cod_asegurado: cod_asegurado,
      p_cod_sec: cod_sec,
      p_limit: 1000,
      p_nropag: 0,
      p_regxpag: 30
    });
  }

  getAseguradoPoliza(cod_asegurado: string, cod_sec: string, cod_poliza: string) {
    return this.apiService.post(this.uriListAsegDetLavado, {
      p_cod_asegurado: cod_asegurado,
      p_cod_sec: cod_sec,
      p_poliza: cod_poliza,
      p_limit: 1000,
      p_nropag: 0,
      p_regxpag: 30
    });
  }

  getDocumentacionLavado(cod_asegurado: string) {
    return this.apiService.post(this.uriListDocumentacionLavado, {
      p_cod_asegurado: cod_asegurado,
      p_limit: 1000,
      p_nropag: 0,
      p_regxpag: 30
    });
  }

  getDocumentacionDocumentos(cod_asegurado: string, cod_documentacion: string) {
    return this.apiService.post(this.uriListDocumentacionDocumentos, {
      p_cod_asegurado: cod_asegurado,
      p_cod_documentacion: cod_documentacion,
      p_limit: 1000,
      p_nropag: 0,
      p_regxpag: 30
    });
  }

  patchDocumentacion(data: any, fieldName: string, value: any) {
    if (value instanceof moment) {
      value = moment(value).format('DD/MM/YYYY');
    }

    var requestParams = {
      // TODO: pedirle al chico backend que unifique los nombre de los parametros por fa
      p_cod_asegurado: data.cod_asegurado,
      p_cod_documentacion: data.cod_documentacion,
      p_suficiente: data.suficiente,
      p_estado: data.cod_estado_documentacion,
      p_o_presentacion: 1,
      p_fecha_vencimiento: data.fec_vto_documentacion
    };

    requestParams = { ...requestParams, ...{ [fieldName]: value } };

    console.log(requestParams);
    return this.apiService.post(this.uriUpdateDocumentacion, requestParams);
  }

  postSaveDocumentacion(data: any, input: HTMLInputElement) {

    console.log(event);

    var formData: FormData = new FormData();
    formData.set('file', input.files.item(0), input.files.item(0).name);
    console.log(formData.get('file'));

    var reader = new FileReader();
    reader.readAsDataURL(input.files.item(0));
    return new Observable(obs => {
      var _this = this;
      // para obtener el text en crudo del archivo tengo que esperar la promesa
      reader.onloadend = function (e: ProgressEvent<FileReader>): any {
        console.log(e.loaded);
        var requestParams = {
          p_cod_asegurado: data.cod_asegurado,
          p_cod_documentacion: data.cod_documentacion,
          p_o_presentacion: 1,
          p_list_archivos: [{
            nombre: input.files.item(0).name.split('.')[0], //TODO:  puede dar null
            extension: AseguradoBasicoService.getExtension(input.files.item(0).type),  //TODO: puede dar null
            contenido: this.result.toString().split(';base64,')[1], //TODO:  puede dar null
          }]
        };
        console.log(requestParams);

        _this.apiService.post(_this.uriSaveDocumentacion, requestParams).subscribe(response => {
          return obs.next(response);
        }, (error : any) => {
          return obs.error(error);
        });
      };

    });
  }

  postDeleteDocumentacion(rowData: any, fileData: any) {

    var requestParams = {
      p_cod_asegurado: rowData.cod_asegurado,
      p_cod_documentacion: rowData.cod_documentacion,
      //TODO: preguntar que es presentacion
      p_o_presentacion: 1,
      //TODO: ver cual es el parametro archivo
      p_o_archivo: fileData.o_archivo
    };

    console.log(requestParams);
    return this.apiService.post(this.uriDeleteDocumentacion, requestParams);
  }

  postSaveAnalisis(cod_asegurado, input: HTMLInputElement) {

    console.log(event);
    return this.apiService.post(this.uriUpdateDocumentacionSuficiente, {
      p_cod_asegurado: cod_asegurado,
      p_o_presentacion: 1,
      p_analisis: input.value
    });
  }

  public static getExtension(file: string) {
    if (file) {
      const splitted = file.split('/');
      if (splitted) {
        const extension = splitted.pop();
        // TODO: ver la extension que te devuelve el file es mucho mas seguro porque es el magic number y realmente sabes si es el tipo de archivo que dice el nombre del archivo,
        // pero deberìamos verificar que todos las extensiones esten contempladas para poder guardarlas en el backend.
        switch (extension) {
          case 'jpeg':
            return 'jpg';
          case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docx';
          case 'msword':
            return 'doc';
          case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'xlsx';
          case 'vnd.ms-excel':
            return 'xls';
        }

        return extension;
      }
    }
    return '';
  }

  /**
   * Este método recibe la respuesta del backend y la modifica para mostrar correctamente en la tabla cuando la persona es jurídica y viene el CUIT.
   * Modifica el data que recibe!
   */
  formatearAsegurado(data) {
    console.log(data);
    data['result'].forEach(item => {

      if (item.importe_prima_emitida) {
        item.importe_prima_emitida = "$" + item.importe_prima_emitida;
      }

      if (item.importe_suma_asegurada) {
        item.importe_suma_asegurada = "$" + item.importe_suma_asegurada;
      }

      if (item.indemnizacion_siniestros) {
        item.indemnizacion_siniestros = "$" + item.indemnizacion_siniestros;
      }

      if (item.es_sujeto_obligado == 'S') {
        item.es_sujeto_obligado = 'SI';
      } else {
        item.es_sujeto_obligado = 'NO';
      }

      if (item.es_pep == 'S') {
        item.es_pep = 'SI';
      } else {
        item.es_pep = 'NO';
      }
      // tipo y numero de documento
      if (item.nro_cuit && Number.isInteger(item.nro_cuit) && item.personeria == "J") {
        item.nro_documento = item.nro_cuit
        item.desc_tipo_documento = 'CUIT'
      }

      if (item.suficiente == 'S') {
        item.suficiente = 'SI';
      } else if (item.suficiente == 'N') {
        item.suficiente = 'NO';
      }
    });
  }
}
