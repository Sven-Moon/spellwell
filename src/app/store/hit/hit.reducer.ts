import { Action, createReducer, on } from '@ngrx/store';
import * as HitActions from './hit.actions';

export const hitFeatureKey = 'hit';

export interface State {
  sp_atk: number
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}

export const initialState: State = {
  sp_atk: 0,
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
};


export const reducer = createReducer(
  initialState,

  on(HitActions.loadHits, state => state),

);

