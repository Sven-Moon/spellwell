import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpellsApiService } from 'src/app/services/spellsApi.service';
import { loadSpells } from 'src/app/store/spells/spells.actions';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    console.log('happening');

    this.store.dispatch(loadSpells())
  }

}
