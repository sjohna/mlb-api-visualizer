import { Component, OnInit } from '@angular/core';
import { MlbApiDataServiceEvent } from '../services/mlb-api-data-service-event';
import { MlbApiDataService } from '../services/mlb-api-data.service';

@Component({
  selector: 'app-service-api-event-list',
  templateUrl: './service-api-event-list.component.html',
  styleUrls: ['./service-api-event-list.component.css']
})
export class ServiceApiEventListComponent implements OnInit {

  constructor(private dataService: MlbApiDataService) { }

  ngOnInit(): void {
  }

  get dataServiceEvents(): MlbApiDataServiceEvent[] {
    return this.dataService.events;
  }

}
