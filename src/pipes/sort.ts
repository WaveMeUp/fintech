/**
 * Created by Viacheslav Osadchiy on 29.06.2017.
 */

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortdate'
})

@Injectable()
export class SortDatePipe implements PipeTransform {
  transform(array: Array<any>, args: string): Array<any> {
    if (typeof args[0] === "undefined") {
      return array;
    }
    let direction = args[0][0];
    let column = args.replace('-','');
    // console.log(direction,column);
    array.sort((a: any, b: any) => {
      // console.log(a,b);
      let left = (new Date(a.updatedAt)).getTime();
      let right = (new Date(b.updatedAt)).getTime();
      // console.log(left,right);
      return (direction === "-") ? right - left : left - right;
    });
    return array;
  }
  transformPromise(array: Array<any>, args: string): Promise<any> {
    if (typeof args[0] === "undefined") {
      return Promise.resolve(array);
    }
    let direction = args[0][0];
    let column = args.replace('-','');
    // console.log(direction,column);
    array.sort((a: any, b: any) => {
      // console.log(a,b);
      let left = (new Date(a.updatedAt)).getTime();
      let right = (new Date(b.updatedAt)).getTime();
      // console.log(left,right);
      return (direction === "-") ? right - left : left - right;
    });
    return Promise.resolve(array);
  }
}
