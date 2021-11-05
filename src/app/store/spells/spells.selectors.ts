import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { ClassDD, Spell, Spells, SubclassDD } from 'src/app/models/Spell';
import { classList } from 'src/app/services/data/lists';
import * as fromSpells from './spells.reducer';
import * as _ from 'lodash'

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
  selectSpells,
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
  selectSpells,
  selectClassesSpells,
  selectSubclassesSpells,
  (allSpells:Spells,spellsClass:Spells, spellsSubClass:Spells):Spells => {
    return mergeSpellResults(spellsClass, spellsSubClass, allSpells)
  }
)

export const selectDcType = createSelector(
  selectSubclassesSpells,
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
  selectClassCombined,
  (state: Spells):Spells => state
);

function mergeSpellResults(
    arr1: Spells, arr2: Spells, allSpells: Spells
  ): Spells {
    // SHORTCUTS
    if (arr2 === [] || arr1.length === allSpells.length) {
      return arr1
    }
    if (arr1.length === 0) { return arr2 }


    let result: Spells = [...arr1]
    let resultIndex: number = 0
    let arr2Index: number = 0

    /** Depends on ordered spell lists */
    while (arr2Index < arr2.length) {
    // if class spells runs out before subclass spells does,
    // attach the remainder to the list and be done
        if (!result[resultIndex]) {
          result.push(arr2[arr2Index])
          arr2Index++
        }
    // * if subclass spell is lower than result(class)Spell,
    //  go to next result spell
        if (arr1[resultIndex] > arr2[arr2Index]) {
          resultIndex++
        }
    // * if they are equal, go on to next for both (no result change)
        if (arr1[resultIndex] === arr2[arr2Index]) {
          arr2Index++
        }
    // otherwise it's greater than, so the spell must be spliced in
    // and the indicies incremented
        result.splice(resultIndex,0,arr2[arr2Index])
        resultIndex++
        arr2Index++
    }
    return result
}

