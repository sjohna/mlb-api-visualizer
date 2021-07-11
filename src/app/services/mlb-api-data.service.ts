import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDate, LocalDateTime } from '@js-joda/core'
import { MlbApiDataServiceEvent } from './mlb-api-data-service-event';
import { DaysGames } from '../types/days-games';

type GameData = { queryTime: LocalDateTime, games: DaysGames };

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  events: MlbApiDataServiceEvent[] = [];

  gamesCache: {[property: string]: GameData } = { };

  constructor(private http: HttpClient) {
  }

  private async queryAPI(queryUri: string): Promise<any> {
    let event = new MlbApiDataServiceEvent('GET', queryUri);
    try {
      event.status = 'In Progress';
      event.startTime = LocalDateTime.now();
      this.events.unshift(event);

      const data: any = await this.http.get(queryUri).toPromise();

      event.status = 'Finished';

      return data;
    }
    catch {
      event.errorString = 'GET failed!';
      event.status = 'Failed';
    } finally {
      event.finishTime = LocalDateTime.now();
    }
  } 

  async queryGamesForDate(date: LocalDate): Promise<void> {
    const queryUri = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date.toString()}&endDate=${date.toString()}`;
    const data = await this.queryAPI(queryUri);

    const daysGames = new DaysGames(data?.dates?.[0])
    this.gamesCache[date.toString()] = { queryTime: LocalDateTime.now(), games: daysGames };

    for (const game of daysGames.games) {
      this.queryLiveDataForGame(game);
    }
  }

  async queryLiveDataForGame(game: any): Promise<void> {
    const queryUri = `http://statsapi.mlb.com${game.link}`;
    const data = await this.queryAPI(queryUri);
    game.live = data;
    game.liveQueryTime = LocalDateTime.now();
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
