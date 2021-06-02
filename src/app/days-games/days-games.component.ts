import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { MlbApiDataService } from '../services/mlb-api-data.service';

@Component({
  selector: 'app-days-games',
  templateUrl: './days-games.component.html',
  styleUrls: ['./days-games.component.css']
})
export class DaysGamesComponent implements OnInit {

  constructor(private dataService: MlbApiDataService) { }

  get daysGamesData(): any {
    return this.dataService.games;
  }

  get lastDataLoadTime(): Date | undefined {
    return this.dataService.lastDataLoadTime;
  }

  ngOnInit(): void {
    this.dataService.queryGames();
  }
}
