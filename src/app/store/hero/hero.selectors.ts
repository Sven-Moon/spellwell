import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHero from './hero.reducer';

export const selectHeroState = createFeatureSelector<fromHero.State>(
  fromHero.heroFeatureKey
);

export const selectHero = createSelector(
  selectHeroState,
  (state) => state
)

export const selectProfBonus = createSelector(
  selectHero,
  (hero) => {
    if (hero.level < 5) return 2
    else if (hero.level < 9) return 3
    else if (hero.level < 13) return 4
    else if (hero.level < 17) return 5
    else return 6
  }
)
