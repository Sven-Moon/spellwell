import { Action, createReducer, on } from '@ngrx/store';
import { Enemy } from 'src/app/models/Enemy';
import * as EnemyActions from './enemy.actions';

export const enemyFeatureKey = 'enemy';

export interface State extends Enemy {

}

export const initialState: State = {
  name: '',
  ac: undefined,
  cha: undefined,
  con: undefined,
  int: undefined,
  str: undefined,
  dex: undefined,
  wis: undefined,
};


export const reducer = createReducer(
  initialState,

  on(EnemyActions.updateEnemy, (state, action) => ({
    ...state,
    name: action.data.name,
    ac: action.data.ac,
    cha: action.data.cha,
    con: action.data.con,
    int: action.data.int,
    str: action.data.str,
    dex: action.data.dex,
    wis: action.data.wis,
  })),

  on(EnemyActions.loadEnemies, state => state),

);

