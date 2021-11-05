import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as SpellsActions from './spells.actions';
import { SpellsApiService } from 'src/app/services/spellsApi.service';
import { Spells } from 'src/app/models/Spell';



@Injectable()
export class SpellsEffects {

  loadSpells$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SpellsActions.loadSpells),
      concatMap(() =>
        this.spellsApi.getAllSpells().pipe(
          map(data => SpellsActions.loadSpellsSuccess({ data })),
          catchError(error => of(SpellsActions.loadSpellsFailure({ error }))))
      )
    );
  });


  loadSpellDetails$ = createEffect(() =>
    this.actions$.pipe(

      ofType(SpellsActions.loadSpellsSuccess),
      // concatMap(() =>
      //   this.spellsApi.getAllSpellDetails().pipe(
      //     map(
      //       (spells:Spells) => SpellsActions.loadSpellDetailsSuccess({ spells })
      //     ),
      //     catchError(error => of(SpellsActions.loadSpellDetailsFailure({ error }))))
      // )
      tap(() => this.spellsApi.getAllSpellDetails()),

    ),
    { dispatch: false }
  );

  // updateFilter$ = createEffect()



  constructor(
    private actions$: Actions,
    private spellsApi: SpellsApiService
  ) {}

}
