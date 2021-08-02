import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: object[], searchText: string): object[] {
    if (searchText === '' || searchText.length < 2) {
      return items;
    }
    if (items && searchText !== '') {
      return items.filter((item) => {
        for (const fieldname of Object.keys(item)) {
          if (String(item[fieldname]).indexOf(searchText) !== -1) {
            return true;
          }
        }
        return false;
      });
    }
  }

}
