import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Enemy } from 'src/app/models/Enemy';
import { Hit, HitOrder } from 'src/app/models/SpellHit';
import { selectEnemyState } from '../enemy/enemy.selectors';
import { selectHeroSpellMod } from '../hero/hero.selectors';
import * as fromHit from './hit.reducer';


export const selectHitState = createFeatureSelector<fromHit.State>(
  fromHit.hitFeatureKey
);

//#region ---------- CALC MOD PERCENTAGES
/** calculates the % hit chnace based on numbers within
 * 1 - 20 will result in a hit
 * 1 is always miss
 * 20 is always hit
 */
export const selectAcHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.ac !== null) {
      let mod = (20 + heroSpellMod - enemy.ac) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
  }
);

export const selectChaHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.cha !== null) {
      let mod = (8 + heroSpellMod - 1 - enemy.cha) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
  }
);

export const selectConHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.con !== null) {
      let mod = (8 + heroSpellMod - 1 - enemy.con) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
    }
);

export const selectDexHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.dex !== null) {
      let mod = (8 + heroSpellMod - 1 - enemy.dex) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
  }
);

export const selectIntHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.int !== null) {
      let mod = (8 + heroSpellMod - 1 - enemy.int) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
  }
);

export const selectStrHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.str !== null) {
      let mod = (8 + heroSpellMod - 1 - enemy.str) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
  }
);

export const selectWisHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | null => {
    if (enemy.wis !== null) {
      let mod = (8 + heroSpellMod - 1 - enemy.wis) / 20
      let boundMod = Math.max(Math.min(mod,.95),.05)
      return boundMod
    } else
    return null
  }
);

//#region ---------- calc mod percentages

export const selectHit = createSelector(
  selectAcHit,
  selectConHit,
  selectChaHit,
  selectDexHit,
  selectIntHit,
  selectStrHit,
  selectWisHit,
  (ac, con, cha, dex, int, str, wis): Hit => {
    let hit: Hit = {
      "ac": {value: ac},
      "con": {value: con},
      "cha": {value: cha},
      "dex": {value: dex},
      "int": {value: int},
      "str": {value: str},
      "wis": {value: wis}
    }
    return hit
  }
);

export const selectHitOrder = createSelector(
  selectHit,
  (hit: Hit) => {
      let hitOrder: HitOrder = {}
      Object.keys(hit).forEach(el => {

        if ( hit[el].value === null) {
          hitOrder[el] = {
            value: null,
            order: null
          }
        } else {
          hitOrder[el] = {
            value: +hit[el].value,
            order: +hit[el].value*20
          }
        }
      });
    return hitOrder
  }
);
