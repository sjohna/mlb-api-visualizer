import { LocalDate } from "@js-joda/core";
import { DaysGameDetails } from "./days-game-details";

export class DaysGames {
  games: DaysGameDetails[] = [];
  date: LocalDate;

  constructor(gamesData: any = undefined) {
    this.date = LocalDate.parse(gamesData.date);

    if (gamesData && gamesData.games && gamesData.games.length) {
      for (let game of gamesData.games) {
        this.games.push(new DaysGameDetails(game));
      }
    } 
  }
}