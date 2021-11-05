import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromEnemy from './enemy/enemy.reducer';
import * as fromHero from './hero/hero.reducer';
import * as fromHit from './hit/hit.reducer';
import * as fromSpells from './spells/spells.reducer';


export interface State {

  [fromEnemy.enemyFeatureKey]: fromEnemy.State;
  [fromHero.heroFeatureKey]: fromHero.State;
  [fromHit.hitFeatureKey]: fromHit.State;
  [fromSpells.spellsFeatureKey]: fromSpells.State;

}

export const reducers: ActionReducerMap<State> = {

  [fromEnemy.enemyFeatureKey]: fromEnemy.reducer,
  [fromHero.heroFeatureKey]: fromHero.reducer,
  [fromHit.hitFeatureKey]: fromHit.reducer,
  [fromSpells.spellsFeatureKey]: fromSpells.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
