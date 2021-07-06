import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/Hero';
import { updateHero } from 'src/app/store/hero/hero.actions';
import { selectHero } from 'src/app/store/hero/hero.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  hero$: Observable<Hero>


  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.hero$ = this.store.select(selectHero)
  }

  heroForm = this.fb.group({
    name: [''],
    level: ['', Validators.min(1)],
    spellMod: ['', Validators.min(1)]
  })

  ngOnInit(): void {
  }

  public updateHero() {
    let data = {
      name: this.heroForm.controls.name.value,
      level: this.heroForm.controls.level.value,
      spellMod: this.heroForm.controls.spellMod.value,
    }
    this.store.dispatch(updateHero({ data }))
  }

}
