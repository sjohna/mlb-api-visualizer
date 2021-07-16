export class Division {
  readonly divisionId: number;
  readonly name: string;
  readonly shortName: string;
  readonly abbreviation: string;

  readonly leagueId: number;

  constructor(data: any) {
    // TODO: throw exception if anything is missing
    this.divisionId = data.id;
    this.name = data.name;
    this.shortName = data.nameShort;
    this.abbreviation = data.abbreviation;

    this.leagueId = data.league.id;
  }
}