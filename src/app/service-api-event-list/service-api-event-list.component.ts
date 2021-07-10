import { Component, OnInit, Input } from '@angular/core';
import { MlbApiDataServiceEvent } from '../services/mlb-api-data-service-event';
import { MlbApiDataService } from '../services/mlb-api-data.service';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-service-api-event-list',
  templateUrl: './service-api-event-list.component.html',
  styleUrls: ['./service-api-event-list.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class ServiceApiEventListComponent implements OnInit {

  @Input() expanded: boolean = true;

  constructor(private dataService: MlbApiDataService) { }

  ngOnInit(): void {
  }

  get dataServiceEvents(): MlbApiDataServiceEvent[] {
    return this.dataService.events;
  }

}
