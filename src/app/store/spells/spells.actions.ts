import { createAction, props } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { Spell, Spells } from 'src/app/models/Spell';

export const loadSpells = createAction(
  '[Spells] Load Spells'
);

export const loadSpellsSuccess = createAction(
  '[Spells] Load Spells Success',
  props<{ data: any }>()
);

export const loadSpellsFailure = createAction(
  '[Spells] Load Spells Failure',
  props<{ error: any }>()
);

export const loadSpellDetails = createAction(
  '[Spells] Load Spell Details'
);

export const loadSpellDetailsSuccess = createAction(
  '[Spells] Load Spell Details Success',
  props<{ spells: Spells }>()
);

export const loadSpellDetailsFailure = createAction(
  '[Spells] Load Spell Details Failure',
  props<{ error: any }>()
);

export const addSpellDetail = createAction(
 '[spells API] Add Spell Detail',
 props<{ spell: Spell }>()
);

export const setFilters = createAction(
 '[Spells] Set Filters',
 props<{ filters: Filters }>()
);
