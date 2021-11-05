import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Spell, Spells } from 'src/app/models/Spell';
import { SpellsApiService } from 'src/app/services/spellsApi.service';
import { loadAllSpells, loadSpells, updateClassFilter, updateSubclassFilter } from 'src/app/store/spells/spells.actions';
import { selectFilters, selectSpells } from 'src/app/store/spells/spells.selectors';
import { Firestore, collectionData, collection, DocumentData, CollectionReference, docData, query, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import {  doc, DocumentReference, getDoc, getDocs, setDoc } from "firebase/firestore";
import {  } from 'rxjs';
import { Filters } from 'src/app/models/Filters';


@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit {
  spells: Spells = []
  spells$: Observable<DocumentData[]>
  data: Spell | undefined
  newSpell: Spell
  spellName:string = ''
  spellsRef: CollectionReference
  spellRef: DocumentReference
  filters: Filters
  q
  spellData: Spells

  constructor(
    private store: Store,
    private firestore: Firestore
  ) {
    this.spellsRef = collection(firestore, 'spells')
    this.spells$ = collectionData(this.spellsRef)
    this.spellRef = doc(firestore, 'spells/fireball')
  }

  ngOnInit(): void {
    this.store.select(selectSpells)
      .subscribe(allSpells => this.spells = allSpells)
    // if (this.spells.length === 0) {
    //   this.store.dispatch(loadSpells())
    // }
    this.store.select(selectFilters)
      .subscribe(filters => this.filters = filters)
    // this.spells$.subscribe(data => this.spellData = data)
    this.loadDbSpellsToStore()
  }

  public async queryFirebaseForSomething(thing:string) {
    /**
     * Hits the firestore database with the indicated query
     * Note that the current implementation instead
     */
    this.q = query(collection(this.firestore,'spells'),
      where("classes", "array-contains", {
        index: 'wizard',
        name: 'Wizard',
        url: '/api/classes/wizard'
      })
    )
    const querySnapshot = await getDocs(this.q)
    querySnapshot.forEach((doc) =>
      console.log(doc.id, " => ", doc.data())
    )
  }

  public async loadDbSpellsToStore() {
    const querySnapshot = await getDocs(this.spellsRef)
    let spellData: Spells = []
    querySnapshot.forEach(doc =>{
      let spell = doc.data() as Spell
      spellData = [...spellData, spell]
    })
    this.store.dispatch(loadAllSpells({ spellData }))
  }

  // public async addNewSpell() {
  //   const newSpell = await addDoc(this.spellsRef, this.newSpell)
  // }

  // public async readASpell() {
  //   const mySnapshot = await getDoc(this.spellRef)
  //   mySnapshot.data.name
  // }

  public findSpell(spellName:string):void {
    this.data = this.spells
      .find(spell => spell.name === spellName)
  }

  public seedSpells() {
    this.spells.forEach((spell:Spell) => {
      setTimeout(() => {
        this.findSpell(spell.name)
        this.addSpellToDb()
      }, 30);
    })
   }

  public async addSpellToDb() {
    if (this.data) {
      setDoc(
        doc(this.spellsRef, this.data.index),
        this.data
      )
    }
  }

}

