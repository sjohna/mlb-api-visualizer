export class Live {
  readonly currentInning: number;
  readonly currentInningOrdinal: string;

  readonly inningHalf: string;
  readonly inningState: string;

  readonly homeTeamRuns?: number;
  readonly awayTeamRuns?: number;

  constructor(data: any) {
    // TODO: throw exceptions if data is malformed
    this.currentInning = data.liveData.linescore.currentInning;
    this.currentInningOrdinal = data.liveData.linescore.currentInningOrdinal;

    this.inningHalf = data.liveData.linescore.inningHalf;
    this.inningState = data.liveData.linescore.inningState;

    this.homeTeamRuns = data.liveData?.linescore?.teams?.home?.runs;
    this.awayTeamRuns = data.liveData?.linescore?.teams?.away?.runs;
  }
}