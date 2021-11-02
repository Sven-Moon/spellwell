import { TestBed } from '@angular/core/testing';

import { SpellsApiService } from '../spellsApi.service';

describe('SpellsApiService', () => {
  let service: SpellsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
