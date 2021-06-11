import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { MlbApiDataService } from '../services/mlb-api-data.service';

import { LocalDate, LocalDateTime } from '@js-joda/core';

@Component({
  selector: 'app-days-games',
  templateUrl: './days-games.component.html',
  styleUrls: ['./days-games.component.css']
})
export class DaysGamesComponent implements OnInit {

  gamesDate: LocalDate;

  constructor(private dataService: MlbApiDataService) {
    this.gamesDate = LocalDate.now();
  }

  get daysGamesData(): any {
    return this.dataService.gamesForDate(this.gamesDate)?.games;
  }

  get lastDataLoadTime(): LocalDateTime | undefined {
    return this.dataService.gamesForDate(this.gamesDate)?.queryTime;
  }

  ngOnInit(): void {
    this.dataService.ensureDateInCache(this.gamesDate);
  }

  nextDay(): void {
    this.gamesDate = this.gamesDate.plusDays(1);
    this.dataService.ensureDateInCache(this.gamesDate);
  }

  previousDay(): void {
    this.gamesDate = this.gamesDate.minusDays(1);
    this.dataService.ensureDateInCache(this.gamesDate);
  }

  reload(): void {
    this.dataService.queryGamesForDate(this.gamesDate);
  }
}
