import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Enemy } from 'src/app/models/Enemy';
import { State } from '../enemy/enemy.reducer';
import { selectEnemyAc, selectEnemyState } from '../enemy/enemy.selectors';
import { selectHeroSpellMod } from '../hero/hero.selectors';
import * as fromHit from './hit.reducer';

export const selectHitState = createFeatureSelector<fromHit.State>(
  fromHit.hitFeatureKey
);

export const selectAcHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => {
    if (enemy.ac !== undefined) {
      return (20 + heroSpellMod - enemy.ac) / 20
    } else return undefined
  }
);

export const selectChaHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => {
    if (enemy.cha !== undefined) {
      return (8 + heroSpellMod - 1 - enemy.cha) / 20
    } else return undefined
  }
);

export const selectConHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => {
    if (enemy.con !== undefined) {
      return (8 + heroSpellMod - 1 - enemy.con) / 20
    } else return undefined
    }
);

export const selectDexHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => { if (enemy.dex !== undefined) { return (8 + heroSpellMod - 1 - enemy.dex) / 20 } else return undefined }
);

export const selectIntHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => {
    if (enemy.int !== undefined) {
      return (8 + heroSpellMod - 1 - enemy.int) / 20
    } else return undefined
  }
);

export const selectStrHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => {
    if (enemy.str !== undefined) {
      return (8 + heroSpellMod - 1 - enemy.str) / 20
    } else return undefined
  }
);

export const selectWisHit = createSelector(
  selectEnemyState,
  selectHeroSpellMod,
  (enemy: Enemy, heroSpellMod: number): number | undefined => {
    if (enemy.wis !== undefined) {
      return (8 + heroSpellMod - 1 - enemy.wis) / 20
    } else return undefined
  }
);

export const selectHit = createSelector(
  selectAcHit,
  selectConHit,
  selectChaHit,
  selectDexHit,
  selectIntHit,
  selectStrHit,
  selectWisHit,
  (ac, con, cha, dex, int, str, wis) => {
    let hit = {
      ac: ac,
      con: con,
      cha: cha,
      dex: dex,
      int: int,
      str: str,
      wis: wis
    }
    return hit
  }
);
