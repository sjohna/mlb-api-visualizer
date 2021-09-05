import { Component, Input, OnInit } from '@angular/core';

import { ZonedDateTime, ZoneId, convert } from '@js-joda/core';
import { MlbApiDataService } from 'src/app/services/mlb-api-data.service';
import { DaysGameDetails } from 'src/app/types/days-game-details';
import { Live } from 'src/app/types/live';

@Component({
  selector: 'app-days-games-game',
  templateUrl: './days-games-game.component.html',
  styleUrls: ['./days-games-game.component.css']
})
export class DaysGamesGamesComponent implements OnInit {

  @Input() game: DaysGameDetails;

  constructor(private dataService: MlbApiDataService) {
    // this shuts up the TS error about game not being assigned in the constructor
    this.game = undefined as any;
  }

  ngOnInit(): void {
    // TODO: throw error if game is not defined
    // See https://stackoverflow.com/questions/35528395/make-directive-input-required
    
    if (this.gameInProgress) {
      this.dataService.ensureLiveInCache(this.game.gameId);
    }
  }

  get gameStateString(): string {
    switch(this.game.status?.statusCode) {
      case 'S': // scheduled
      case 'P': // pre-game
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric'}).format(convert(ZonedDateTime.parse(this.game.gameDate).withZoneSameInstant(ZoneId.SYSTEM)).toDate());
      case 'I': // in-progress
      case 'M': // manager challenge
        if(this.liveAvailable) {
          return `${this.live.inningHalf} ${this.live.currentInningOrdinal}`;
        } else {
          return '';
        }
      default:
        return `${this.game.status.detailedState}${(this.game.status.reason ? ' (' + this.game.status.reason + ')' : '')}`;
    }
  }

  // helpers for getting game data
  get gameStatusCode(): string {
    return this.game.status.statusCode || '';
  }

  get homeTeamRuns(): number {
    return this.game.score?.home as number;
  }

  get awayTeamRuns(): number {
    return this.game.score?.away as number;
  }

  get homeTeamName(): string {
    return this.game.homeTeamName;
  }

  get awayTeamName(): string {
    return this.game.awayTeamName;
  }

  get liveAvailable() {
    return !!this.dataService.liveForGame(this.game.gameId);
  }

  get gameOver() {
    return this.gameStatusCode === 'F' || this.gameStatusCode === 'FR' || this.gameStatusCode === 'O';
  }

  get gameInProgress() {
    return this.gameStatusCode === 'I' || this.gameStatusCode === 'M';
  }

  private get live(): Live {
    // TODO: get rid of this type assertion...
    return this.dataService.liveForGame(this.game.gameId)?.data as Live;
  }

  get scoreAvailable() {
    return (this.gameOver || this.gameInProgress) 
      && this.game.score !== undefined;
  }

  get homeTeamWon() {
    return this.gameOver && this.homeTeamRuns > this.awayTeamRuns;
  }

  get awayTeamWon() {
    return this.gameOver && this.awayTeamRuns > this.homeTeamRuns;
  }

}
