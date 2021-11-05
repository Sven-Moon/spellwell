import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver';
import { Filters } from 'src/app/models/Filters';
import { updateClassFilter, updateSubclassFilter } from 'src/app/store/spells/spells.actions';
import { selectFilters } from 'src/app/store/spells/spells.selectors';

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

  public classChecks: Array<CheckChoices> = [
    // {title: '', value: 'artificer'},
    // {title: '', value: 'barbarian'},
    // {title: '', value: 'bard'},
    // {title: '', value: 'cleric'},
    // {title: '', value: 'druid'},
    // {title: '', value: 'fighter'},
    // {title: '', value: 'monk'},
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
    {title: 'Swamp', value: 'swamp'},
    {title: 'Stars', value: 'stars'},
    // {title: '', value: ''},
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
  }

  initCheckboxOptions(options: CheckChoices[],filterState:string[]) {
    return this.fb.array(
      options.map(option =>  {
        this.filters.classes.includes(option.value)
          ? true : false
      })
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

    const classOptionsArray = (this.form.controls.classOptions as FormArray);
    const subclassOptionsArray = (this.form.controls.subclassOptions as FormArray);

    // when a value changes

    this.classSubscription = classOptionsArray.valueChanges.subscribe(
      () => {
        classOptionsArray.setValue(
          classOptionsArray.value.map((value, i) =>
            value ? this.classChecks[i].value : false
          ), { emitEvent: false }
        );
        let classes = classOptionsArray.value.filter(value => !!value)
        this.store.dispatch(updateClassFilter({classes}))
      }
    );
    this.subclassSubscription = subclassOptionsArray.valueChanges.subscribe(
      () => {
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
      }
    );
  }

  returnPositives(array: Array<any>): Observable<string[]> {
    console.log('array');
    console.log(array);

    let resultArray = []
    array.forEach((element,i) => {
      console.log(element)
      if (!!element) { resultArray.push(this.subclassChecks[i].value) }
    })

    console.log('resultArray');
    console.log(resultArray);
    return of(resultArray)
  }


  submit() {
    const checkboxControl = (this.form.controls.checkboxes as FormArray);
  }

  // public updateClassFilter() {
  //   let classes = []
  //   let classOptions = this.getClassArray.controls


  //   this.store.dispatch(updateClassFilter({classes}))
  // }

  // get getClassArray(): FormArray {
  //   console.log('here:');

  //   let co = this.form.get('classOptions')
  //   console.log(co)
  //   return co as FormArray
  // }



  ngOnDestroy() {
    this.classSubscription.unsubscribe();
    this.subclassSubscription.unsubscribe();
  }
}

