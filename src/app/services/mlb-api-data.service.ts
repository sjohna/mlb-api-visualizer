import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDate, LocalDateTime } from '@js-joda/core'
import { MlbApiDataServiceEvent } from './mlb-api-data-service-event';
import { DaysGames } from '../types/days-games';
import { Live } from '../types/live';
import { Team } from '../types/team';
import { Division } from '../types/division';

type GameData = { queryTime: LocalDateTime, games: DaysGames };
type LiveData = { queryTime: LocalDateTime, live: Live };

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  events: MlbApiDataServiceEvent[] = [];

  daysGamesCache: Record<string, GameData> = { };
  gameLiveDataCache: Record<number, LiveData> = { };
  teamsCache: Record<number, Team> = { };
  divisionCache: Record<number, Division> = { };

  initialized: boolean = false;

  constructor(private http: HttpClient) {
    this.makeInitialQueries();
  }

  private async makeInitialQueries() {
    await this.queryTeams();
    await this.queryDivisions();
  }

  private async queryTeams(): Promise<void> {
    const queryUri = 'http://statsapi.mlb.com/api/v1/teams?sportId=1';
    const teamData = await this.queryAPI(queryUri);

    for (let team of teamData?.teams) {
      const teamObj = new Team(team);

      this.teamsCache[teamObj.teamId] = teamObj;
    }
  }

  private async queryDivisions(): Promise<void> {
    const queryUri = 'http://statsapi.mlb.com/api/v1/divisions?sportId=1';
    const divisionData = await this.queryAPI(queryUri);

    for (let division of divisionData?.teams) {
      const divisionObj = new Division(division);

      this.divisionCache[divisionObj.divisionId] = divisionObj;
    }
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
    this.daysGamesCache[date.toString()] = { queryTime: LocalDateTime.now(), games: daysGames };
  }

  async queryLiveForGame(gameId: number): Promise<void> {
    const queryUri = `http://statsapi.mlb.com/api/v1.1/game/${gameId}/feed/live`;
    const data = await this.queryAPI(queryUri);
    this.gameLiveDataCache[gameId] = { queryTime: LocalDateTime.now(), live: new Live(data) };
  }

  gamesForDate(date: LocalDate): GameData | undefined {
    return this.daysGamesCache[date.toString()];
  }

  ensureDateInCache(date: LocalDate): void {
    if (!this.daysGamesCache.hasOwnProperty(date.toString()))
    {
      this.queryGamesForDate(date);
    }
  }

  liveForGame(gameId: number): LiveData | undefined {
    return this.gameLiveDataCache[gameId];
  }

  ensureLiveInCache(gameId: number): void {
    if (!this.gameLiveDataCache.hasOwnProperty(gameId))
    {
      this.queryLiveForGame(gameId);
    }
  }
}
