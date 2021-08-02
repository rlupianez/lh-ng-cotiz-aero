
import { Pipe, PipeTransform } from '@angular/core';

export interface FormViewerOptions {
  cols: number;
  title: string;
  fields: object;
}

@Pipe({
  name: 'formViewerColumns'
})
export class FormViewerColumnsPipe implements PipeTransform {

  transform(opts: FormViewerOptions, colsQty: number): any {
    const columnsNr = colsQty || opts.cols;

    if (!opts.cols) {
      return Object.keys(opts.fields);
    } else {
      const fieldsKeys = Object.keys(opts.fields);
      const fieldsQty = fieldsKeys.length;
      const fieldsPerCol = Math.ceil(fieldsQty / columnsNr);

      let fieldsInColumns = [];
      let fCol = {};

      /*for(let i = 0; i < columnsNr; i++){
        fieldsInColumns.push( this.getFieldsObject(fieldsKeys.splice(0, fieldsPerCol), opts.fields));
      }*/
      let columns = [];
      // recorremos la cantidad de columnas
      for (let i = 0; i < columnsNr; i++) {
        let columnFields = {};
        // columnFields[fieldsKeys[i]] = opts.fields[fieldsKeys[i]]     
        // recorremos por cantidad de campos por columna
        for (let x = 0; x < fieldsPerCol; x++) {
          let fieldIndex = i + (x * columnsNr);
          if (fieldsKeys[fieldIndex]) {
            columnFields[fieldsKeys[fieldIndex]] = opts.fields[fieldsKeys[fieldIndex]];
          }

        }

        columns.push({ type: 'form', fields: columnFields });
      }


      return columns;
    }

  }

  getFieldsObject(arrFields: string[], allFields: object) {
    let obj = {};
    for (let name of arrFields) {
      if (allFields[name]) {
        obj[name] = allFields[name];
      }
    }
    return { type: 'form', fields: obj };
  }

}
