import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDate } from '@js-joda/core'

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  games: any;
  lastDataLoadTime?: Date;

  constructor(private http: HttpClient) { }

  async queryGames(): Promise<void> {
    const today = LocalDate.now();
    const queryString = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${today.toString()}&endDate=${today.toString()}`;
    console.log(queryString);
    const games: any = await this.http.get(queryString).toPromise();
    this.games = games.dates[0];
    this.lastDataLoadTime = new Date();
  }
}
