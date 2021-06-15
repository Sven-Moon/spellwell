import { Action, createReducer, on } from '@ngrx/store';
import * as HeroActions from './hero.actions';

export const heroFeatureKey = 'hero';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(HeroActions.loadHeros, state => state),

);

