import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MlbApiDataService {

  games: any;
  lastDataLoadTime?: Date;

  constructor(private http: HttpClient) { }

  async queryGames(): Promise<void> {
    const games: any = await this.http.get("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").toPromise();
    this.games = games.dates[0];
    this.lastDataLoadTime = new Date();
  }
}
