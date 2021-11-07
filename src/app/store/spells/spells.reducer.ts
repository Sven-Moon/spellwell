import { createReducer, on } from '@ngrx/store';
import { indexOf } from 'lodash';
import { Filters } from 'src/app/models/Filters';
import { Spell, Spells } from 'src/app/models/Spell';
import { dc_typesList } from 'src/app/services/data/dc_types';
import { classList, subclassList } from 'src/app/services/data/lists';
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
    dc_types: dc_typesList,
    classes: classList,
    subclasses: subclassList,
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
    var currentIndex
    state.spells.some((index) => currentIndex = index)
    if (currentIndex) {
      let newSpells = [...state.spells, action.spell]
      newSpells.splice(currentIndex,1)
      return {
        ...state, spells: newSpells
    }
    } else {
      return state
    }
  }),
  on(SpellsActions.setFilters, (state,action) => ({
    ...state, filters: action.filters
  })),
  on(SpellsActions.updateFilterFromHero, (state,action) => ({
    ...state, filters: {
      ...state.filters,
      classes: [action.hero.class],
      subclasses: [action.hero.subclass]
    }
  })),
  on(SpellsActions.updateFilterFromEnemy, (state,action) => ({
    ...state, filters: {
      ...state.filters,
      dc_types: [action.dc_type]
    }
  })),
  on(SpellsActions.loadAllSpells, (state,action) => ({
    ...state, spells: action.spellData
  })),

  //#region  -------- CLASSES
  on(SpellsActions.updateClassFilter, (state, action) => ({
    ...state, filters: {
      ...state.filters, classes: action.classes
    }
  })),
  on(SpellsActions.selectAllClasses, (state, action) => ({
    ...state, filters: {
      ...state.filters, classes: action.allClasses
    }
  })),
  on(SpellsActions.deselectAllClasses, (state, action) => ({
    ...state, filters: {
      ...state.filters, classes: []
    }
  })),
  //#endregion -------- classes

  //#region  -------- SUBCLASSES
  on(SpellsActions.updateSubclassFilter, (state, action) => ({
    ...state, filters: {
      ...state.filters, subclasses: action.subclasses
    }
  })),
  on(SpellsActions.selectAllSubclasses, (state, action) => ({
    ...state, filters: {
      ...state.filters, subclasses: action.allSubclasses
    }
  })),
  on(SpellsActions.deselectAllClasses, (state, action) => ({
    ...state, filters: {
      ...state.filters, subclasses: []
    }
  })),
  //#endregion -------- subclasses


  //#region  -------- DC_TYPES
  on(SpellsActions.updateDcTypeFilter, (state, action) => ({
    ...state, filters: {
      ...state.filters, dc_types: action.dcTypes
    }
  })),
  on(SpellsActions.selectAllDcTypes, (state, action) => ({
    ...state, filters: {
      ...state.filters, dc_types: action.allDcTypes
    }
  })),
  on(SpellsActions.deselectAllDcTypes, (state, action) => ({
    ...state, filters: {
      ...state.filters, dc_types: []
    }
  })),
  //#endregion -------- dc_types
);

