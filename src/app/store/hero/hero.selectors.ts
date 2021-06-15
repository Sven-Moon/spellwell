import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHero from './hero.reducer';

export const selectHeroState = createFeatureSelector<fromHero.State>(
  fromHero.heroFeatureKey
);
