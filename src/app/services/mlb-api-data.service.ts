import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDate, LocalDateTime } from '@js-joda/core'
import { MlbApiDataServiceEvent } from './mlb-api-data-service-event';

type GameData = { queryTime: LocalDateTime, games: any };

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  events: MlbApiDataServiceEvent[] = [];

  gamesCache: {[property: string]: GameData } = { };

  constructor(private http: HttpClient) {
   }

  async queryGamesForDate(date: LocalDate): Promise<void> {
    const queryString = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date.toString()}&endDate=${date.toString()}`;

    let event = new MlbApiDataServiceEvent('GET', queryString);

    this.events.unshift(event);

    try {
      event.status = 'In Progress';
      event.startTime = LocalDateTime.now();
      const data: any = await this.http.get(queryString).toPromise();
      this.gamesCache[date.toString()] = { queryTime: LocalDateTime.now(), games: data.dates[0] };
      event.status = 'Finished';

      for (const game of data.dates[0].games) {
        this.queryLiveDataForGame(game);
      }

    }
    catch {
      event.errorString = 'GET failed!';
      event.status = 'Failed';
    }

    event.finishTime = LocalDateTime.now();
  }

  async queryLiveDataForGame(game: any): Promise<void> {
    const queryString = `http://statsapi.mlb.com${game.link}`;

    let event = new MlbApiDataServiceEvent('GET', queryString);

    this.events.unshift(event);

    try {
      event.status = 'In Progress';
      event.startTime = LocalDateTime.now();
      const data: any = await this.http.get(queryString).toPromise();
      game.live = data;
      game.liveQueryTime = LocalDateTime.now();
      event.status = 'Finished';
    }
    catch {
      event.errorString = 'GET failed!';
      event.status = 'Failed';
    }

    event.finishTime = LocalDateTime.now();    
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
