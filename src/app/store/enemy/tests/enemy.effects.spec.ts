import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EnemyEffects } from '../enemy.effects';

describe('EnemyEffects', () => {
  let actions$: Observable<any>;
  let effects: EnemyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EnemyEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(EnemyEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
