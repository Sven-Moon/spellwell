import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { ClassDD, Spell, Spells, SubclassDD } from 'src/app/models/Spell';
import { classList } from 'src/app/services/data/lists';
import * as fromSpells from './spells.reducer';
import * as _ from 'lodash'
import { dc_typesList } from 'src/app/services/data/dc_types';

export const selectSpellsState = createFeatureSelector<fromSpells.State>(
  fromSpells.spellsFeatureKey
);

export const selectAllSpells = createSelector(
  selectSpellsState,
  (state):Spells => state.spells
)

export const selectFilters = createSelector(
  selectSpellsState,
  (state):Filters => state.filters
)

export const selectClassesSpells = createSelector(
  selectAllSpells,
  selectFilters,
  (spells:Spells,filters:Filters):Spells => {
    // SHORTCUT: don't process if no positive filters
    if (filters.classes.length === 0) { return [] }
    // SHORTCUT: if all values chosen, just return all spells
    if (filters.classes.length === classList.length) {
      return spells
    }

    return spells.filter((spell:Spell) =>{
      if (!spell.classes) {return null}
      return spell.classes.some((thisClass: ClassDD) =>
        filters.classes.some(classInFilter =>{
          if (thisClass.index && classInFilter){
            return thisClass.index === classInFilter
          }
          else return null
        })
      )
    })
  }
)

export const selectSubclassesSpells = createSelector(
  selectAllSpells,
  selectFilters,
  (spells:Spells, filters:Filters):Spells => {
    // SHORTCUT: don't process if no positive filters
    if (filters.subclasses.length === 0) { return [] }
    /**
     * searches for spell's listed subclass in list
     * of positive subclass filters, returns on match
     */
    return spells.filter((spell:Spell) =>{
      if (!spell.subclasses) { return false }
      return spell.subclasses.some((subclass: SubclassDD) =>{
         return filters.subclasses.some(subclassFilter =>{
          if (subclass.name && subclassFilter){
            return subclass.name.toLowerCase() === subclassFilter.toLowerCase()
          } else return false
        })
      })
    })
  }
)

export const selectClassCombined = createSelector(
  selectAllSpells,
  selectClassesSpells,
  selectSubclassesSpells,
  (allSpells:Spells,spellsClass:Spells, spellsSubClass:Spells):Spells => {
    return orSpellResults(spellsClass, spellsSubClass, allSpells)
  }
)

export const selectNoDcSpells = createSelector(
  selectAllSpells,
  (spells:Spells) => spells.filter(spell => !spell.dc)
)

export const selectDcSpells = createSelector(
  selectAllSpells,
  (spells:Spells) => spells.filter(spell => spell.dc)
)

export const selectDcType = createSelector(
  selectAllSpells,
  selectDcSpells,
  selectNoDcSpells,
  selectFilters,
  (allSpells:Spells, dcSpells:Spells, noDcSpells:Spells, filters:Filters):Spells =>{
    // SHORTCUTS
    if (filters.dc_types.length === dc_typesList.length) {
      return allSpells
    }
    if (filters.dc_types.length === 0) {
      return []
    }

    let results:Spells = []

    results = dcSpells.filter((spell:Spell) =>{
      return filters.dc_types.some(dc_typeInFilter =>
        spell.dc.dc_type.index === dc_typeInFilter
      )
    })
    if (filters.dc_types.includes('none')) {
      console.log('none included');

      results = orSpellResults(results,noDcSpells,allSpells)
    }

    return results
  }
)

export const selectDcTypeAndClassOrSubclass = createSelector(
  selectClassCombined,
  selectDcType,
  selectAllSpells,
  (classSpells,dcSpells,allSpells) =>
   andSpellResults(classSpells,dcSpells,allSpells )
)

export const selectFiltersResult = createSelector(
  selectDcTypeAndClassOrSubclass,
  (state: Spells):Spells => state
);

function orSpellResults(
    arr1: Spells, arr2: Spells, allSpells: Spells
  ): Spells {
    // SHORTCUTS
    if (arr2 === [] || arr1.length === allSpells.length) {
      return arr1
    }
    if (arr1.length === 0) { return arr2 }

    var merged = _.merge(_.keyBy(arr1, 'index'), _.keyBy(arr2, 'index'))
    var result = _.values(merged)
    var orderedResult = _.orderBy(result, 'index')

    return orderedResult
}

function andSpellResults(arr1:Spells, arr2: Spells, allSpells:Spells):Spells {
    // SHORTCUTS
    if (arr1 === [] || arr1 === []) {
      return []
    }
    if (arr1.length === allSpells.length && arr1.length === allSpells.length)
    {
       return allSpells
    }

    return arr1.filter(a1Spell =>
      arr2.some(a2Spell => a1Spell.index === a2Spell.index)
    )
}

