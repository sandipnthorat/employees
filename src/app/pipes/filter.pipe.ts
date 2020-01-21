import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // Filter name and city
  transform(value: any, ...args: any[]): any {
    let filterData = [];
    if (!args[0]) {
      filterData = value;
    } else {
      filterData = value.filter(x => {
        const name = x.name.trim().toLowerCase().includes(args[0].trim().toLowerCase());
        const city = x.address.city.trim().toLowerCase().includes(args[0].trim().toLowerCase());
        const str = name + city;
        return str;
      }
      );
    }
    return filterData;
  }
}
