import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-days-games-game',
  templateUrl: './days-games-game.component.html',
  styleUrls: ['./days-games-game.component.css']
})
export class DaysGamesGamesComponent implements OnInit {

  @Input() game: any;

  constructor() { }

  ngOnInit(): void {
  }

  get gameStateString(): string {
    switch(this.game.status.statusCode) {
      case 'S':
        return this.game.gameDate;
      default:
        return this.game.status.detailedState;
    }
  }

}
