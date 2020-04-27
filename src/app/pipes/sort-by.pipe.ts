import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: true
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {
    if (propertyName) {
      return value.sort((a: any, b: any) => b[propertyName].toString().localeCompare(a[propertyName].toString()));
    } else {
      return value;
    }
  }
}
