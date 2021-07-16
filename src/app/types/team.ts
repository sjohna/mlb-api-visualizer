export class Team {
  readonly teamId: number;
  readonly fullName: string;
  readonly abbreviation: string;
  readonly teamName: string;
  readonly locationName: string;
  readonly shortName: string;

  readonly leagueId: number;
  readonly divisionId: number;

  constructor(data: any) {
    // TODO: check for missing data
    this.teamId = data.id;
    this.fullName = data.name;
    this.abbreviation = data.abbreviation;
    this.teamName = data.teamName;
    this.locationName = data.locationName;
    this.shortName = data.shortName;

    this.leagueId = data.league.id;
    this.divisionId = data.division.id;
  }
}