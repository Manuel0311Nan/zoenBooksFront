import { TestBed } from '@angular/core/testing';

import { PagesApiService } from './pages-api.service';

describe('PagesApiService', () => {
  let service: PagesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
