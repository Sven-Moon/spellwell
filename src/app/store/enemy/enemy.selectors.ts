import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnemy from './enemy.reducer';

export const selectEnemyState = createFeatureSelector<fromEnemy.State>(
  fromEnemy.enemyFeatureKey
);
