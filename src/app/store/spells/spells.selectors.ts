import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { ClassDD, Spell, Spells, SubclassDD } from 'src/app/models/Spell';
import { setFilters } from './spells.actions';
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


/** Abandoned for an attempt at queries made
 * through the Firestore
 */
// export const selectFilteredSpells = createSelector(
//   selectSpells,
//   selectFilters,
//   (spells: Spells, filters:Filters) => {
//     spells.filter((spell: Spell) => {
//       if (!spell.classes) {
//         return false
//       }
//       if (
//         spell.classes
//         .some((classDD: ClassDD) => classDD.index === filters.class)
//         || filters.class === '')
//       {
//         return false
//       }
//       if (!spell.subclasses) {
//         return false
//       }
//       if (
//         spell.subclasses
//         .some((classDD: SubclassDD) => classDD.index === filters.class)
//         || filters.subclass === '')
//       {
//         return false
//       }
//       if (spell.dc && spell.dc.dc_type) {
//         spell.dc.dc_type === filters.dc_type
//           || filters.dc_type === undefined
//       }
//       }
//       else { return true })
//     }

//   }
// )
