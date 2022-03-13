import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceApiEventListComponent } from './service-api-event-list.component';

describe('ServiceApiEventListComponent', () => {
  let component: ServiceApiEventListComponent;
  let fixture: ComponentFixture<ServiceApiEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceApiEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceApiEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
