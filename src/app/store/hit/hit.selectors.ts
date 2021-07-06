import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHit from './hit.reducer';

export const selectHitState = createFeatureSelector<fromHit.State>(
  fromHit.hitFeatureKey
);
