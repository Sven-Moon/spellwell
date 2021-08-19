import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectChaHit, selectHit } from 'src/app/store/hit/hit.selectors';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.component.html',
  styleUrls: ['./hit.component.scss']
})
export class HitComponent implements OnInit {
  hit: any
  hitOrder: any
  statIndex = ["ac", "cha", "con", "dex", "int", "str", "wis"]

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectHit).subscribe(hit => {
      this.hit = hit
      this.hitOrder = {
        // { ac: +this.hit.ac * 20 },
        // { cha: +this.hit.cha * 20 },
        // { con: +this.hit.con * 20 },
        // { dex: +this.hit.dex * 20 },
        // { int: +this.hit.int * 20 },
        // { str: +this.hit.str * 20 },
        // { wis: +this.hit.wis * 20 },

        ac: {
          order: +this.hit.ac * 20,
          value: this.hit.ac
        },
        cha: {
          order: +this.hit.cha * 20,
          value: this.hit.cha
        },
        con: {
          order: +this.hit.con * 20,
          value: this.hit.con
        },
        dex: {
          order: +this.hit.dex * 20,
          value: this.hit.dex
        },
        int: {
          order: +this.hit.int * 20,
          value: this.hit.int
        },
        str: {
          order: +this.hit.str * 20,
          value: this.hit.str
        },
        wis: {
          order: +this.hit.wis * 20,
          value: this.hit.wis
        },
      }
      console.log(this.hitOrder["ac"].value)
      console.log(this.hitOrder["ac"].order)
    })

  }

  calcOrder(hit: number) {

  }


}
