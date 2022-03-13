import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysGamesGamesComponent } from './days-games-game.component';

describe('DaysGamesGamesComponent', () => {
  let component: DaysGamesGamesComponent;
  let fixture: ComponentFixture<DaysGamesGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysGamesGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysGamesGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
