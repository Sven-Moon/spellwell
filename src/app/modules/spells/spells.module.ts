import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellsComponent } from './spells.component';
import { EffectsModule } from '@ngrx/effects';
import { SpellsEffects } from '../../store/spells/spells.effects';
import { ResultsComponent } from './results/results.component';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [
    SpellsComponent,
    ResultsComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([SpellsEffects])
  ]
})
export class SpellsModule { }
