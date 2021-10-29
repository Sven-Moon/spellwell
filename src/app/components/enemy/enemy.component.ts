import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateEnemy } from 'src/app/store/enemy/enemy.actions';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})

export class EnemyComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  enemyForm = this.fb.group({
    name: [''],
    ac: [, Validators.min(0)],
    str: [, Validators.min(-5)],
    dex: [, Validators.min(-5)],
    con: [, Validators.min(-5)],
    int: [, Validators.min(-5)],
    wis: [, Validators.min(-5)],
    cha: [, Validators.min(-5)],
  })

  ngOnInit(): void {
  }

  public updateEnemy() {
    let data = {
      name: this.enemyForm.controls.name.value,
      ac: this.enemyForm.controls.ac.value,
      str: this.enemyForm.controls.str.value,
      dex: this.enemyForm.controls.dex.value,
      con: this.enemyForm.controls.con.value,
      int: this.enemyForm.controls.int.value,
      wis: this.enemyForm.controls.wis.value,
      cha: this.enemyForm.controls.cha.value,
    }
    this.store.dispatch(updateEnemy({ data }))
  }
}
