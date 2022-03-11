import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DaysGamesComponent } from './days-games/days-games.component';
import { DaysGamesGamesComponent } from './days-games/days-games-game/days-games-game.component';
import { ServiceApiEventListComponent } from './service-api-event-list/service-api-event-list.component';

import { TooltipModule } from 'primeng/tooltip';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { DaysStandingsComponent } from './days-standings/days-standings.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DaysGamesComponent,
    DaysGamesGamesComponent,
    ServiceApiEventListComponent,
    DayOfWeekPipe,
    DaysStandingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
