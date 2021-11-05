import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver';
import { Filters } from 'src/app/models/Filters';
import { selectAllClasses, selectAllSubclasses, updateClassFilter, updateSubclassFilter } from 'src/app/store/spells/spells.actions';
import { selectFilters } from 'src/app/store/spells/spells.selectors';
import * as spellsActions from 'src/app/store/spells/spells.actions';

  interface CheckChoices {
    title: string,
    value: string
  }
  interface CheckboxGroup {
    name:string,
    values: Array<CheckChoices>
  }

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filters: Filters
  form: FormGroup
  classFormGroup: FormGroup
  subclassFormGroup: FormGroup
  classSubscription: Subscription
  subclassSubscription: Subscription
  classOptionsArray: FormArray;
  subclassOptionsArray: FormArray;


  public classChecks: Array<CheckChoices> = [
    {title: 'Artificer', value: 'artificer'},
    {title: 'Barbarian', value: 'barbarian'},
    {title: 'Bard', value: 'bard'},
    {title: 'Cleric', value: 'cleric'},
    {title: 'Druid', value: 'druid'},
    {title: 'Fighter', value: 'fighter'},
    {title: 'Monk', value: 'monk'},
    {title: 'Paladin', value: 'paladin'},
    {title: 'Ranger', value: 'ranger'},
    {title: 'Rogue', value: 'rogue'},
    {title: 'Sorcerer', value: 'sorcerer'},
    {title: 'Warlock', value: 'warlock'},
    {title: 'Wizard', value: 'wizard'},
  ]

  public subclassChecks: Array<CheckChoices> = [
    {title: 'Land', value: 'land'},
    {title: 'Lore', value: 'lore'},
    {title: 'Fiend', value: 'fiend'},
    {title: 'Devotion', value: 'devotion'},
    {title: 'Life', value: 'life'},
  ]
  checkboxFormGroups: CheckboxGroup[] = [
    {
      name: 'classChecks',
      values: this.classChecks
    },
    {
      name: 'subclassChecks',
      values: this.subclassChecks
    },
  ]

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.store.select(selectFilters)
      .subscribe(filters => this.filters = filters)
    this.initCheckboxForms()
    this.initCheckboxSubscriptions()
  }

  initCheckboxOptions(
    options: CheckChoices[],
    filterState:string[]
  ): FormArray {
    return this.fb.array(
      options.map(option =>
        filterState.includes(option.value)
          ? true : false
      )
    )
  }

  initCheckboxForms(): void  {
    this.form = this.fb.group({
      classOptions: this.initCheckboxOptions(
        this.classChecks, this.filters.classes
      ),
      subclassOptions: this.initCheckboxOptions(
        this.subclassChecks, this.filters.subclasses
        )
    })
  }

  initCheckboxSubscriptions(): void {
    const classOptionsArray = this.form.controls.classOptions as FormArray;
    const subclassOptionsArray = this.form.controls.subclassOptions as FormArray;

    this.classSubscription = this.classFormArray.valueChanges.subscribe(() => {
      classOptionsArray.setValue(
        classOptionsArray.value.map((value, i) =>
          value ? this.classChecks[i].value : false
        ), { emitEvent: false }
      );
      let classes = classOptionsArray.value.filter(value => !!value)
      this.store.dispatch(updateClassFilter({classes}))
    });

    this.subclassSubscription = subclassOptionsArray.valueChanges
    .subscribe(() => {
      // set the checked value [null, null, >true, null] (1st)
      // set the checked value [false, >true, thing2, false] (1st)
      subclassOptionsArray.setValue(
        // truthy values map to the value in array
        // [false, thing1, thing2, false]
        subclassOptionsArray.value.map((value, i) =>
          value ? this.subclassChecks[i].value : false
        ), { emitEvent: false }
      );
      // remove falsy values from the array
      let subclasses = subclassOptionsArray.value.filter(value => !!value)
      this.store.dispatch(updateSubclassFilter({subclasses}))
    })
  }

  ngOnDestroy() {
    this.classSubscription.unsubscribe();
    this.subclassSubscription.unsubscribe();
  }

  selectAll(type: string) {
    switch (type) {
      case 'class':
        this.setAllAs(true,this.classFormArray)
        break;
        case 'subclass':
        this.setAllAs(true,this.subclassFormArray)
        break;
      default:
        break;
    }
  }

  deselectAll(type: string) {
    switch (type) {
      case 'class':
        this.setAllAs(false,this.classFormArray)
        break;
        case 'subclass':
        this.setAllAs(false,this.subclassFormArray)
        break;
      default:
        break;
    }
  }

  private setAllAs(val: boolean, array: FormArray) {
    array.setValue(
      array.value.map(_ => val)
    )
  }

  get classFormArray() {
    return this.form.get('classOptions') as FormArray
  }
  get subclassFormArray() {
    return this.form.get('subclassOptions') as FormArray
  }

}

