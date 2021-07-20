import { LocalDate } from "@js-joda/core";

export class StandingsOnDate {
  readonly date: LocalDate;
  readonly alDivisions: DivisionStanding[] = [];
  readonly nlDivisions: DivisionStanding[] = [];

  constructor(date: LocalDate, alDivisionData: any, nlDivisionData: any) {
    this.date = date;

    for (let divisionData of alDivisionData.records) {
      this.alDivisions.push(new DivisionStanding(divisionData));
    }

    for (let divisionData of nlDivisionData.records) {
      this.nlDivisions.push(new DivisionStanding(divisionData));
    }
  }
}

export class DivisionStanding {
  readonly leagueId: number;
  readonly divisionId: number;

  readonly teamRecords: StandingTeamRecord[] = []; // in order of division rank

  constructor(data: any) {
    this.leagueId = data.league.id;
    this.divisionId = data.division.id;

    for (let teamData of data.teamRecords) {
      this.teamRecords.push(new StandingTeamRecord(teamData));
    }
  }
}

export class StandingTeamRecord {
  readonly teamId: number;
  readonly teamName: string;

  readonly streakType: StreakType;
  readonly streakLength: number;

  readonly gamesPlayed: number;
  readonly gamesWon: number;
  readonly gamesLost: number;
  readonly winPercent: number;

  readonly divisionGamesBack: string;
  readonly wildCardGamesBack: string;

  readonly divisionRank: number;
  readonly leagueRank: number;
  readonly sportRank: number;

  readonly magicNumber: string;
  readonly eliminationNumber: string;
  readonly wildCardEliminationNumber: string;

  readonly divisionLeader: boolean;
  readonly clinched: boolean;

  constructor(data: any) {
    // TODO: exceptions...
    this.teamId = data.team.id;
    this.teamName = data.team.name;

    this.streakType = (data.streak.streakType == 'losses' ? StreakType.Losing : StreakType.Winning);
    this.streakLength = data.streak.streakNumber;

    this.gamesPlayed = data.gamesPlayed;
    this.gamesWon = data.leagueRecord.wins;
    this.gamesLost = data.leagueRecord.losses;
    this.winPercent = Number(data.leagueRecord.pct);

    this.divisionGamesBack = data.divisionGamesBack;
    this.wildCardGamesBack = data.wildCardGamesBack;

    this.divisionRank = Number(data.divisionRank);
    this.leagueRank = Number(data.leagueRank);
    this.sportRank = Number(data.sportRank);

    this.magicNumber = data.magicNumber;
    this.eliminationNumber = data.eliminationNumber;
    this.wildCardEliminationNumber = data.wildCardEliminationNumber;

    this.divisionLeader = data.divisionLeader;
    this.clinched = data.clinched;
  }
}

export enum StreakType {
  Winning,
  Losing
}