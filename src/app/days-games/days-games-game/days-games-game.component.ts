import { Component, Input, OnInit } from '@angular/core';

import { LocalDateTime, ZonedDateTime, ZoneId, DateTimeFormatter, convert } from '@js-joda/core';
import { GameDetails } from 'src/app/types/game-details';

@Component({
  selector: 'app-days-games-game',
  templateUrl: './days-games-game.component.html',
  styleUrls: ['./days-games-game.component.css']
})
export class DaysGamesGamesComponent implements OnInit {

  @Input() game: GameDetails;

  constructor() {
    // this shuts up the TS error about game not being assigned in the constructor
    this.game = undefined as any;
  }

  ngOnInit(): void {
    // TODO: throw error if game is not defined
    // See https://stackoverflow.com/questions/35528395/make-directive-input-required
  }

  get gameStateString(): string {
    switch(this.game.status?.statusCode) {
      case 'S':
      case 'P':
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric'}).format(convert(ZonedDateTime.parse(this.game.gameDate).withZoneSameInstant(ZoneId.SYSTEM)).toDate());
      case 'I':
      case 'M':
        if(this.liveAvailable) {
          return `${this.game.live.liveData.linescore.inningHalf} ${this.game.live.liveData.linescore.currentInningOrdinal}`;
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
    return this.game.live.liveData.linescore.teams.home.runs;
  }

  get awayTeamRuns(): number {
    return this.game.live.liveData.linescore.teams.away.runs;
  }

  get homeTeamName(): string {
    return this.game.homeTeamName;
  }

  get awayTeamName(): string {
    return this.game.awayTeamName;
  }

  get liveAvailable() {
    return !!this.game.live && !!this.game.liveQueryTime;
  }

  get gameOver() {
    return this.gameStatusCode === 'F' || this.gameStatusCode === 'FR';
  }

  get gameInProgress() {
    return this.gameStatusCode === 'I';
  }

  get scoreAvailable() {
    return this.liveAvailable 
      && (this.gameOver || this.gameInProgress) 
      && !!this.game.live.liveData
      && !!this.game.live.liveData.linescore
      && !!this.game.live.liveData.linescore.teams; 
  }

  get homeTeamWon() {
    return this.liveAvailable && this.gameOver && this.homeTeamRuns > this.awayTeamRuns;
  }

  get awayTeamWon() {
    return this.liveAvailable && this.gameOver && this.awayTeamRuns > this.homeTeamRuns;
  }

}
