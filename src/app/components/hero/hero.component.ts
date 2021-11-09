import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/Hero';
import { updateHero } from 'src/app/store/hero/hero.actions';
import { selectHero } from 'src/app/store/hero/hero.selectors';
import * as lists from 'src/app/services/data/lists'
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  hero$: Observable<Hero>
  heroClasses = lists.heroClasses
  heroSubclasses = lists.heroSubclasses


  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.hero$ = this.store.select(selectHero)
  }

  heroForm = this.fb.group({
    name: [''],
    level: [1, Validators.min(1)],
    spellMod: [0, Validators.min(1)],
    class: [''],
    subclass: [''],
  })

  ngOnInit(): void {
  }

  public updateHero() {
    let f = this.heroForm.controls
    let hero = {
      name: f.name.value,
      level: f.level.value,
      spellMod: f.spellMod.value,
      class: f.class.value,
      subclass: f.subclass.value
    }
    this.store.dispatch(updateHero({ hero }))
  }

}
