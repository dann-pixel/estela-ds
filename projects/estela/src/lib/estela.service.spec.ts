import { TestBed } from '@angular/core/testing';

import { EstelaService } from './estela.service';

describe('EstelaService', () => {
  let service: EstelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
