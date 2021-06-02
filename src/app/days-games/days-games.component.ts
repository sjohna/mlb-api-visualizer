import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-days-games',
  templateUrl: './days-games.component.html',
  styleUrls: ['./days-games.component.css']
})
export class DaysGamesComponent implements OnInit {

  daysGamesData: any;
  lastDataLoadTime?: Date;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1")
      .subscribe((data: any) => 
        {
          this.daysGamesData = data.dates[0];
          this.lastDataLoadTime = new Date();
        });
  }
}
