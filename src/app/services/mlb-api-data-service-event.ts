import { LocalDateTime } from '@js-joda/core';

export type MlbApiDataServiceEventStatus = 'Not Started' | 'In Progress' | 'Failed' | 'Finished';

export class MlbApiDataServiceEvent {
    createTime: LocalDateTime;
    startTime?: LocalDateTime;
    finishTime?: LocalDateTime;
    status: MlbApiDataServiceEventStatus;

    errorString?: string;

    constructor(public method: string, public url: string) {
        this.createTime = LocalDateTime.now();
        this.status = 'Not Started';
    }

    get description() {
        return `${this.method} ${this.url}`;
    }
}