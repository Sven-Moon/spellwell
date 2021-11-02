import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Spell, Spells } from '../models/Spell';
import { addSpellDetail, loadSpellDetailsSuccess } from '../store/spells/spells.actions';
import { selectSpells } from '../store/spells/spells.selectors';

@Injectable({
  providedIn: 'root'
})
export class SpellsApiService {
  baseUrl = 'https://www.dnd5eapi.co/api/spells/'
  spellBox: Spells = []

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  public getAllSpells(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  public getAllSpellDetails(): void {
    let allSpells: Spells = []
    var spellsWDetails: Spells = []
    this.store.select(selectSpells)
    .subscribe(spells => allSpells = Object.assign([], spells))

    allSpells.forEach(spell => {
      next: this.getEachSpellDetail(spell.index)
      .subscribe({
        next: (detailedSpell:Spell) => {
           this.store.dispatch(addSpellDetail({spell: detailedSpell}))
        },
        error: (error) => console.log(error)
      })
    })
    // .pipe()
    // console.log(spellsWDetails)
    // return of(spellsWDetails)
  }

  private getEachSpellDetail(spell:string): Observable<any> {
    let url = this.baseUrl + spell
    return this.http.get(url)
  }

  private spellsInABox(spell: Spell){
    this.spellBox = [...this.spellBox, spell]
  }

}
