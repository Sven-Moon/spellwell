import { createReducer, on } from '@ngrx/store';
import { indexOf } from 'lodash';
import { Filters } from 'src/app/models/Filters';
import { Spell, Spells } from 'src/app/models/Spell';
import * as SpellsActions from './spells.actions';

export const spellsFeatureKey = 'spells';

export interface State {
  spells: Spells,
  filters: Filters
  error: any
}

export const initialState: State = {
  spells: [],
  filters: {
    dc_type: '',
    class: '',
    subclass: '',
    // minLevel: null
  },
  error: null
};


export const reducer = createReducer(
  initialState,
  on(SpellsActions.loadSpellsSuccess,
    (state, action) => ({ ...state, spells: action.data.results })
  ),
  on(SpellsActions.loadSpellsFailure,
    (state, action) => ({ ...state, error: action.error })),
  on(SpellsActions.loadSpellDetailsSuccess, (state, action) =>
  ({ ...state, spells: action.spells })),
  on(SpellsActions.loadSpellDetailsFailure,
    (state, action) => ({ ...state, error: action.error })),
  on(SpellsActions.addSpellDetail, (state,action) => {
    var f
    var found = state.spells.some((spell,index) => {
      f = index
      return spell.index == action.spell.index;
    })
    if (f) {
      let newSpells = [...state.spells, action.spell]
      newSpells.splice(f,1)
      return {
        ...state, spells: newSpells
    }
    } else {
      return state
    }
  }),
  on(SpellsActions.setFilter, (state,action) =>
    ({...state, filters: action.filter})),
  on(SpellsActions.setFilters, (state,action) =>
    ({...state, filters: action.filters})),
);

