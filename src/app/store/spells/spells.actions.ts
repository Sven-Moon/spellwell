import { createAction, props } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { Hero } from 'src/app/models/Hero';
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

export const updateFilterFromHero = createAction(
 '[Hero] Update Filter From Hero',
 props<{ hero: Hero }>()
);

export const updateFilterFromEnemy = createAction(
 '[Hit] Update Filter From Enemy',
 props<{ dc_type: string }>()
);

export const loadAllSpells = createAction(
  '[Spell] Load All Spells (w/ Details)',
  props<{ spellData: Spells }>()
);

export const updateClassFilter = createAction(
  '[Spell] Update Class Filter',
  props<{ classes: string[] }>()
);

export const updateSubclassFilter = createAction(
  '[Spell] Update Subclass Filter',
  props<{ subclasses: string[] }>()
);

export const selectAllClasses = createAction(
 '[Filter] Select All Classes',
 props<{ allClasses: string[] }>()
);

export const selectAllSubclasses = createAction(
 '[Filter] Select All Subclasses',
 props<{ allSubclasses: string[] }>()
);

export const deselectAllClasses = createAction(
 '[Filter] Deselect All Classes'
);

export const deselectAllSubclasses = createAction(
 '[Filter] Deselect All Subclasses'
);
