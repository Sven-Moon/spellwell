import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Spell, Spells } from '../models/Spell';
import { addSpellDetail, loadSpellDetailsSuccess } from '../store/spells/spells.actions';
import { selectSpells } from '../store/spells/spells.selectors';
import { spellData } from './data/spellData';

@Injectable({
  providedIn: 'root'
})
export class SpellsApiService {
  baseUrl = 'https://www.dnd5eapi.co/api/spells/'
  spells$: Observable<Spells>
  spellData: Spells

  constructor(
    private http: HttpClient,
    private store: Store,
    private firestore: Firestore
  ) {
    const spellCollection: any = collection(firestore, 'spells')
    this.spells$ = collectionData(spellCollection)
  }

  public getAllSpells(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  public getAllSpellsTODO(): Observable<any> {
    // return this.http.get(this.baseUrl)
    return of(spellData)
  }

  public getAllSpellDetails(): void {
    let allSpells: Spells = []
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
  }

  private getEachSpellDetail(spell:string): Observable<any> {
    let url = this.baseUrl + spell
    return this.http.get(url)
  }

}
