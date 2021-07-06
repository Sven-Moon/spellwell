import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer, StoreModule
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromEnemy from './enemy/enemy.reducer';
import * as fromHero from './hero/hero.reducer';
import * as fromHit from './hit/hit.reducer';
// import { EffectsModule } from '@ngrx/effects';
import { HitEffects } from './hit/hit.effects';


export interface State {

  [fromEnemy.enemyFeatureKey]: fromEnemy.State;
  [fromHero.heroFeatureKey]: fromHero.State;
  [fromHit.hitFeatureKey]: fromHit.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromEnemy.enemyFeatureKey]: fromEnemy.reducer,
  [fromHero.heroFeatureKey]: fromHero.reducer,
  [fromHit.hitFeatureKey]: fromHit.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
