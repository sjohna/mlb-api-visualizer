import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysStandingsComponent } from './days-standings.component';

describe('DaysStandingsComponent', () => {
  let component: DaysStandingsComponent;
  let fixture: ComponentFixture<DaysStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysStandingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
