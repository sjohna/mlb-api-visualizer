import { Component, OnInit, ViewChild } from '@angular/core';

import { MlbApiDataService } from '../../services/mlb-api-data.service';

import { LocalDate, LocalDateTime, nativeJs } from '@js-joda/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-days-games',
  templateUrl: './days-games.component.html',
  styleUrls: []
})
export class DaysGamesComponent implements OnInit {
  @ViewChild('picker') gamesDatePicker: MatDatepicker<Date> | undefined;

  gamesDate: LocalDate;

  get dataServiceInitialized() : boolean {
    return this.dataService.initialized;
  } 

  constructor(private dataService: MlbApiDataService) {
    this.gamesDate = LocalDate.now();
  }

  get daysGamesData(): any {
    return this.dataService.gamesForDate(this.gamesDate)?.data;
  }

  get lastDataLoadTime(): LocalDateTime | undefined {
    return this.dataService.gamesForDate(this.gamesDate)?.queryTime;
  }

  ngOnInit(): void {
    //this.dataService.ensureGamesForDateInCache(this.gamesDate);
  }

  nextDay(): void {
    this.gamesDate = this.gamesDate.plusDays(1);
    this.dataService.ensureGamesForDateInCache(this.gamesDate);
  }

  previousDay(): void {
    this.gamesDate = this.gamesDate.minusDays(1);
    this.dataService.ensureGamesForDateInCache(this.gamesDate);
  }

  reload(): void {
    this.dataService.queryGamesForDate(this.gamesDate);
  }

  setDate(date: LocalDate) {
    this.gamesDate = date;
    this.dataService.ensureGamesForDateInCache(this.gamesDate);
  }

  selectDate() {
    this.gamesDatePicker!.open();
  }

  setDateFromPicker(date: MatDatepickerInputEvent<Date>) {
    if (date.value) {
      let jodaDate = LocalDate.from(nativeJs(date.value));
      this.setDate(jodaDate);      
    }

  }
}
