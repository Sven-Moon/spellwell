import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HitEffects } from '../hit.effects';

describe('HitEffects', () => {
  let actions$: Observable<any>;
  let effects: HitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HitEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(HitEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
