import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HitOrder } from 'src/app/models/SpellHit';
import { selectChaHit, selectHit, selectHitOrder } from 'src/app/store/hit/hit.selectors';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.component.html',
  styleUrls: ['./hit.component.scss']
})
export class HitComponent implements OnInit {
  hitOrder: HitOrder = {}
  statIndex = ["ac", "cha", "con", "dex", "int", "str", "wis"]

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
    this.store.select(selectHitOrder).subscribe(hitOrder => {
      this.hitOrder = hitOrder
    })
  }

}
