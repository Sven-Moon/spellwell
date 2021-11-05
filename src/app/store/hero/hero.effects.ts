import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as HeroActions from './hero.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateFilterFromHero } from '../spells/spells.actions';


@Injectable()
export class HeroEffects {

  // updateFilterFromHero$ = createEffect(() =>{
  //   return this.actions$.pipe(
  //     ofType(HeroActions.updateHero),
  //     tap((action) => updateFilterFromHero({ hero: action.hero }))
  //   )
  // })


  // loadHeros$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(HeroActions.loadHeros),
  //     /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //     concatMap(() => EMPTY as Observable<{ type: string }>)
  //   );
  // });


  constructor(private actions$: Actions) {}

}
