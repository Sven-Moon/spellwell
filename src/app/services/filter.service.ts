import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filters } from '../models/Filters';
import { Spells } from '../models/Spell';
import { selectFilters } from '../store/spells/spells.selectors';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
filters: Filters
  constructor(
    private store: Store
  ) {
    this.store.select(selectFilters)
      .subscribe(filters => this.filters = filters)
   }

  // public filterSpells(spells: Spells) {
  //   spells.filter(spell => spell.classes.find())
  // }

  private filterClass(spells: Spells) {

  }

  private filterSubClass(spells: Spells) {

  }

  private filterDcType(spells: Spells) {

  }

  private filterLevel(spells: Spells) {

  }

  private filterDuration(spells: Spells) {

  }

  private filterRange(spells: Spells) {

  }

  private filterConcentration(spells: Spells) {

  }
}
