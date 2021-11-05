import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filters } from 'src/app/models/Filters';
import { Hero } from 'src/app/models/Hero';
import { HitOrder } from 'src/app/models/SpellHit';
import { initialState } from 'src/app/store/hero/hero.reducer';
import { selectHero } from 'src/app/store/hero/hero.selectors';
import { selectChaHit, selectHit, selectHitOrder } from 'src/app/store/hit/hit.selectors';
import { setFilters, updateClassFilter, updateFilterFromEnemy, updateFilterFromHero, updateSubclassFilter } from 'src/app/store/spells/spells.actions';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.component.html',
  styleUrls: ['./hit.component.scss']
})
export class HitComponent implements OnInit {
  hitOrder: HitOrder = {}
  statIndex = ["ac", "cha", "con", "dex", "int", "str", "wis"]
  hero: Hero = initialState

  constructor(
    private store: Store
  ) { }

  /**
   * Stats start at null, producing 'N/A' for display;
   * Order is determined by hits out of 20 (d20); Value
   * is the %chance to hit.
   * The red bar indicates order = 13 or 65%, the recommended
   * value for engagements.
   */
  ngOnInit(): void {
    this.store.select(selectHitOrder).subscribe(
      hitOrder => this.hitOrder = hitOrder)
    this.store.select(selectHero).subscribe(
      hero => this.hero = hero)
  }

  public setFilters(stat: string) {
    this.store.dispatch(updateFilterFromEnemy({ dc_type: stat }))
    if (this.hero.class){
      this.store.dispatch(updateClassFilter({ classes: [this.hero.class] }))
    }
    if (this.hero.subclass){
      this.store.dispatch(updateSubclassFilter({ subclasses: [this.hero.subclass] }))
    }
  }

}
