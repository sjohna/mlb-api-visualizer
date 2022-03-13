import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysGamesComponent } from './days-games.component';

describe('DaysGamesComponent', () => {
  let component: DaysGamesComponent;
  let fixture: ComponentFixture<DaysGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
