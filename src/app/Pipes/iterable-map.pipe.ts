import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterableMap'
})
export class IterableMapPipe implements PipeTransform {

  transform(value: Map<string, any>, args?: allowableArgs): any[] {

    //snag keys off the map and make an array hold the data
    let keyArr = value.keys();
    let dataArr = [];

    // loop through the Map, and
    // push values to the return array
    Array.from(keyArr).forEach( (key) => {
      switch(args) {
        case allowableArgs.returnKeyValues:
          dataArr.push({key: key, value: value.get(key)});
          break;

        default:
          dataArr.push(value.get(key));
          break;
      }
    });

    // return the resulting array
    return dataArr;
  }
}


export enum allowableArgs {
  returnKeyValues = 0
}
