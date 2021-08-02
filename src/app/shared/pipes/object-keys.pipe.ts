import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: Object, args: string[]): any {
    const keys = [];
    for (const key in value) {
      if (value[key]) {
        keys.push(key);
      }
    }
    return keys;
  }
}
