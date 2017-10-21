import { Pipe, PipeTransform } from '@angular/core';
import { Button } from '../metadata/sm/dataViewModule.md';

@Pipe({
    name: 'typefilter',
    pure: false
})
export class TypeFilterPipe implements PipeTransform {
    transform(items: any[], filter: Button): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        // return items.filter(item => item.title.indexOf(filter.title) !== -1);
    }
}