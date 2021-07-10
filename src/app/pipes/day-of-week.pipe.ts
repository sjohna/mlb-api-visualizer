import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek, LocalDate } from '@js-joda/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {

  transform(date: LocalDate): string {
    return date.dayOfWeek().toString();
  }

}
