import { createAction, props } from '@ngrx/store';
import { Enemy } from 'src/app/models/Enemy';

export const updateEnemy = createAction(
  '[Enemy] Update Enemy',
  props<{ data: Enemy }>()
);


// boilerplate
export const loadEnemies = createAction(
  '[Enemy] Load Enemies'
);




