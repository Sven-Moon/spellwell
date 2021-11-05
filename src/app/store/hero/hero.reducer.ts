import { Action, createReducer, on } from '@ngrx/store';
import { Hero } from 'src/app/models/Hero';
import * as HeroActions from './hero.actions';

export const heroFeatureKey = 'hero';


export interface State extends Hero {
}


export const initialState = {
  name: '',
  level: 1,
  spellMod: 0,
  class: '',
  subClass: ''
};


export const reducer = createReducer(
  initialState,

  on(HeroActions.loadHeros, state => state),
  on(HeroActions.updateHero, (state, action) => ({
    ...state,
    name: action.hero.name,
    level: action.hero.level,
    spellMod: action.hero.spellMod,
    class: action.hero.class,
    subClass: action.hero.subClass
  })),


);
