import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { ClassDD, Spell, Spells, SubclassDD } from 'src/app/models/Spell';
import * as fromSpells from './spells.reducer';

export const selectSpellsState = createFeatureSelector<fromSpells.State>(
  fromSpells.spellsFeatureKey
);

export const selectSpells = createSelector(
  selectSpellsState,
  (state):Spells => state.spells
)

export const selectFilters = createSelector(
  selectSpellsState,
  (state):Filters => state.filters
)

export const selectClassesSpells = createSelector(
  selectSpells,
  selectFilters,
  (spells:Spells,filters:Filters):Spells => {
    if (filters.classes.length === 0) { return spells }

    return spells.filter((spell:Spell) =>{
      if (!spell.classes) {return null}
      return spell.classes.some((thisClass: ClassDD) =>
        filters.classes.some(classInFilter =>
          classInFilter.toLowerCase() === thisClass.index.toLowerCase()
        )
      )
    })
  }
)

export const selectSubClassesSpells = createSelector(
  selectSpells,
  selectFilters,
  (spells:Spells, filters:Filters):Spells => {
    if (filters.subclasses.length === 0) { return [] }
    return spells.filter((spell:Spell) =>{
      if (!spell.subclasses) { return null }
      return spell.subclasses.some((subClass: SubclassDD) =>
        filters.subclasses.some(subClassFilter =>
          subClass.name.toLowerCase() === subClassFilter.toLowerCase())
      )
    })
  }
)

export const selectClassTotal = createSelector(
  selectClassesSpells, selectSubClassesSpells,
  (spellsClass:Spells, spellSubClass:Spells):Spells => {
    let result: Spells = spellsClass
    if (spellSubClass === []) { return spellsClass }
    spellSubClass.forEach(subSpell => {
      spellsClass.forEach((classSpell,index) => {
        if (subSpell.index === classSpell.index) {
          return
        }
        if (subSpell.index > classSpell.index) {
          result.splice(index)
        }
      });
    })
    return result
  }
)

export const selectDcType = createSelector(
  selectSubClassesSpells,
  selectFilters,
  (spells:Spells,filters:Filters):Spells =>
    spells.filter((spell:Spell) =>
      filters.dc_types.some(dc_type =>
        filters.dc_types.some(dc_typeInFilter =>
          dc_type === dc_typeInFilter)
      )
    )
)

export const selectFiltersResult = createSelector(
  selectClassesSpells,
  (state: Spells):Spells => state
);

