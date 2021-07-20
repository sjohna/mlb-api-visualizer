import { Component, OnInit } from '@angular/core';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import { MlbApiDataService } from '../services/mlb-api-data.service';

@Component({
  selector: 'app-days-standings',
  templateUrl: './days-standings.component.html',
  styleUrls: ['./days-standings.component.css']
})
export class DaysStandingsComponent implements OnInit {

  standingsDate: LocalDate;

  constructor(private dataService: MlbApiDataService) {
    this.standingsDate = LocalDate.now();
  }

  ngOnInit(): void {
    this.dataService.ensureStandingsForDateInCache(this.standingsDate);
  }

  nextDay(): void {
    this.standingsDate = this.standingsDate.plusDays(1);
    this.dataService.ensureGamesForDateInCache(this.standingsDate);
  }

  previousDay(): void {
    this.standingsDate = this.standingsDate.minusDays(1);
    this.dataService.ensureGamesForDateInCache(this.standingsDate);
  }

  get daysStandingsData(): any {
    return this.dataService.standingsForDate(this.standingsDate)?.data;
  }

  get lastDataLoadTime(): LocalDateTime | undefined {
    return this.dataService.standingsForDate(this.standingsDate)?.queryTime;
  }

  reload(): void {
    this.dataService.queryStandingsForDate(this.standingsDate);
  }
}
