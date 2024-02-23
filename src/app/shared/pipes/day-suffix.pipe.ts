import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daySuffix',
  standalone: true
})

export class DaySuffixPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) {
      return 'Invalid day';
    }
    if (+value < 1 || +value > 31) {
      return 'Invalid day';
    }
    if (+value >= 11 && +value <= 13) {
      return +value + 'th';
    }
    switch (+value % 10) {
      case 1:
        return +value + 'st';
      case 2:
        return +value + 'nd';
      case 3:
        return +value + 'rd';
      default:
        return +value + 'th';
    }
  }

}
