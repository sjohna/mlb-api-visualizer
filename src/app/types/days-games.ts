export class DaysGames {
  games: any[];

  constructor(gamesData: any = undefined) {
    if (gamesData && gamesData.games && gamesData.games.length) {
      this.games = gamesData.games;
    } else {
      this.games = [];
    }
  }
}