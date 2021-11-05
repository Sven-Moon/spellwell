import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as EnemyActions from './enemy.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateFilterFromEnemy } from '../spells/spells.actions';


@Injectable()
export class EnemyEffects {

  // updateFilterFromEnemy$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(EnemyActions.updateEnemy),
  //     tap(action => updateFilterFromEnemy({ enemy: action.dc_type }))
  //   )
  // })


  //   // loadEnemys$ = createEffect(() => {
  //     // return this.actions$.pipe(

  //       // ofType(EnemyActions.loadEnemys),
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       concatMap(() => EMPTY as Observable<{ type: string }>)
  //     );
  //   });


    constructor(private actions$: Actions) {}

}
