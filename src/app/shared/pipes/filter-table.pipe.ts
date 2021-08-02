import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  objectIsEmpty(data: object): boolean {
    for (const key of Object.keys(data)) {
      if (data[key].trim() !== '' ) {
        return false;
      }
    }

    return true;
  }

  transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {

    if (!filter || this.objectIsEmpty(filter)) {
      return items;
    } else {
      return items.filter(item => {
        const notMatchingField = Object.keys(filter).find(key => {
            const itemVal = String(item[key]).toLocaleLowerCase();
            const filterVal = filter[key].trim().toLocaleLowerCase();

            return itemVal.indexOf(filterVal) === -1 ;
          });

        return !notMatchingField;
      });
    }


    return items.filter(item => {
      return item.siniestro === filter.siniestro;
    });

    return items;
  }

}
