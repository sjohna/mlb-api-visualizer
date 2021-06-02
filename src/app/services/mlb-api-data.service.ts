import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDate, LocalDateTime } from '@js-joda/core'

type GameData = { queryTime: LocalDateTime, games: any };

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  gamesCache: {[property: string]: GameData } = { };

  constructor(private http: HttpClient) {
   }

  async queryGamesForDate(date: LocalDate): Promise<void> {
    const queryString = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date.toString()}&endDate=${date.toString()}`;
    console.log(queryString);
    const games: any = await this.http.get(queryString).toPromise();
    this.gamesCache[date.toString()] = { queryTime: LocalDateTime.now(), games: games.dates[0] };
  }

  gamesForDate(date: LocalDate): GameData | undefined {
    return this.gamesCache[date.toString()];
  }

  ensureDateInCache(date: LocalDate): void {
    if (!this.gamesCache.hasOwnProperty(date.toString()))
    {
      this.queryGamesForDate(date);
    }
  }
}
