import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DaysGamesComponent } from './days-games/days-games.component';
import { DaysGamesGamesComponent } from './days-games/days-games-game/days-games-game.component';

@NgModule({
  declarations: [
    AppComponent,
    DaysGamesComponent,
    DaysGamesGamesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
