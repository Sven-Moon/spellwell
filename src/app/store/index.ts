import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromEnemy from './enemy/enemy.reducer';
import * as fromHero from './hero/hero.reducer';


export interface State {

  [fromEnemy.enemyFeatureKey]: fromEnemy.State;
  [fromHero.heroFeatureKey]: fromHero.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromEnemy.enemyFeatureKey]: fromEnemy.reducer,
  [fromHero.heroFeatureKey]: fromHero.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
