import { GameDetails } from "./game-details";

export class DaysGames {
  games: GameDetails[] = [];

  constructor(gamesData: any = undefined) {
    if (gamesData && gamesData.games && gamesData.games.length) {
      for (let game of gamesData.games) {
        this.games.push(new GameDetails(game));
      }
    } 
  }
}