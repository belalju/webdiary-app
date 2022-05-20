import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, searchValue: string, categoryId: number) {
    console.log(categoryId);

    if (!searchValue) return value;
    return value.filter((v: { categoryId: number; title: string; content: string; }) => v.categoryId === Number(categoryId) 
    //|| v.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 
    //|| v.content.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    )

  }

}