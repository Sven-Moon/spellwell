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

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectHit).subscribe(hit =>
      this.hit = hit
    )
  }



}
