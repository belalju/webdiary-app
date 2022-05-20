import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: string) {

    if (!searchValue) return value;
    return value.filter((v: { title: string; content: string; }) => v.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.content.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
    
  }

}