/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EvoluationService } from './evoluation.service';

describe('Service: System', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvoluationService]
    });
  });

  it('should ...', inject([EvoluationService], (service: EvoluationService) => {
    expect(service).toBeTruthy();
  }));
});
