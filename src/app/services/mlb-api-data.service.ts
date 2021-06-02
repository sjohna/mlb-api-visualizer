import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDate, LocalDateTime } from '@js-joda/core'

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  games: any;
  lastDataLoadTime?: LocalDateTime;
  currentDay: LocalDate;

  constructor(private http: HttpClient) {
    this.currentDay = LocalDate.now();
    this.queryGames();
   }

  async queryGames(): Promise<void> {
    const queryString = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${this.currentDay.toString()}&endDate=${this.currentDay.toString()}`;
    console.log(queryString);
    const games: any = await this.http.get(queryString).toPromise();
    this.games = games.dates[0];
    this.lastDataLoadTime = LocalDateTime.now();
  }

  previousDay(): void {
    this.currentDay = this.currentDay.minusDays(1);
    this.queryGames();
  }

  nextDay(): void {
    this.currentDay = this.currentDay.plusDays(1);
    this.queryGames();
  }
}
