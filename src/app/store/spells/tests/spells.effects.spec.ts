import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpellsEffects } from '../spells.effects';

describe('SpellsEffects', () => {
  let actions$: Observable<any>;
  let effects: SpellsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpellsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SpellsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
