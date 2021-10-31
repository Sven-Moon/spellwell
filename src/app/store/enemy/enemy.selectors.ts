import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnemy from './enemy.reducer';

export const selectEnemyState = createFeatureSelector<fromEnemy.State>(
  fromEnemy.enemyFeatureKey
);

export const selectEnemyName = createSelector(
  selectEnemyState,
  (state) => state.name
);

export const selectEnemyAc = createSelector(
  selectEnemyState,
  (state) => state.ac
);

export const selectEnemyCon = createSelector(
  selectEnemyState,
  (state): number | null => state.con
);

export const selectEnemyCha = createSelector(
  selectEnemyState,
  (state) => state.cha
);

export const selectEnemyDex = createSelector(
  selectEnemyState,
  (state) => state.dex
);

export const selectEnemyInt = createSelector(
  selectEnemyState,
  (state) => state.int
);

export const selectEnemyStr = createSelector(
  selectEnemyState,
  (state) => state.str
);

export const selectEnemyWis = createSelector(
  selectEnemyState,
  (state) => state.wis
);
