export class DaysGameDetails {
  readonly status: {
    readonly statusCode: string;
    readonly detailedState: string;
    readonly reason: string;
  }

  readonly gameDate: string;

  readonly awayTeamName: string;
  readonly homeTeamName: string;

  readonly score?: {
    home: number;
    away: number;
  }

  readonly gameId: number;

  constructor(gameData: any) {
    // TODO throw exceptions if data is malformed...
    this.gameDate = gameData.gameDate;

    this.status = {
      statusCode: gameData.status.statusCode,
      detailedState: gameData.status.detailedState,
      reason: gameData.status.reason || ''
    }

    this.homeTeamName = gameData.teams.home.team.name;
    this.awayTeamName = gameData.teams.away.team.name;

    this.gameId = gameData.gamePk;

    if (gameData?.teams?.home?.score !== undefined && gameData?.teams?.away?.score !== undefined) {
      this.score = { home: gameData.teams.home.score, away: gameData.teams.away.score};
    }
  }
}