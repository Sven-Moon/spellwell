import { Action, createReducer, on } from '@ngrx/store';
import * as EnemyActions from './enemy.actions';

export const enemyFeatureKey = 'enemy';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(EnemyActions.loadEnemys, state => state),

);

