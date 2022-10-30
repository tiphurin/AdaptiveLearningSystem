import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(rawNum:string) {
    const startStr = rawNum.slice(0,3);
    const middleStr = rawNum.slice(3,6);
    const endStr = rawNum.slice(6,10);

    return `${startStr}-${middleStr}-${endStr}`;
  }
}
