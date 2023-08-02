import { TestBed } from '@angular/core/testing';

import { SharedBetweenSiblingsService } from './shared-between-siblings.service';

describe('SharedBetweenSiblingsService', () => {
  let service: SharedBetweenSiblingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedBetweenSiblingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
