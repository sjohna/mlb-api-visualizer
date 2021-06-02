import { TestBed } from '@angular/core/testing';

import { MlbApiDataService } from './mlb-api-data.service';

describe('MlbApiDataServiceService', () => {
  let service: MlbApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MlbApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
