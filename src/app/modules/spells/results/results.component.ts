import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Spells } from 'src/app/models/Spell';
import { selectClassesSpells, selectFiltersResult } from 'src/app/store/spells/spells.selectors';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: Spells

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectClassesSpells)
      .subscribe(result => this.results = result)
  }

}

