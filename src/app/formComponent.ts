import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-component',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, JsonPipe,
    FormsModule, NgIf],
  templateUrl: `./formComponent.html`,
  styles: ``
})
export class FormCompoent implements OnInit {
  formData = this.fb.group({
    countryData: [null, Validators.required],
    stateData: [null, Validators.required],
    cityData: [null, Validators.required]
  }); 

  formDataStore: Array<LocationDetails> | undefined;

  /**
   * Below hardcoded values we can get from service
   */
  private countries: Array<Country> = [
    { id: 1, name: "India" },
    /* { id: 2, name: "Australia" },
    { id: 3, name: "Canada" },
    { id: 4, name: "Brazil" }, */
    { id: 5, name: "England" }
  ];


  private states: Array<State> = [
    { id: 1, name: "Bihar", countryId: 1 },
    { id: 2, name: "UP", countryId: 1 },
    { id: 3, name: "MP", countryId: 1 },
    { id: 4, name: "London", countryId: 5 },
    { id: 5, name: "Lomdon new", countryId: 5 },
  ];

  private cities: Array<City> = [
    { id: 1, name: "11", stateId: 1 },
    { id: 2, name: "111", stateId: 1 },
    { id: 3, name: "11111", stateId: 1 },
    { id: 4, name: "22", stateId: 2 },
    { id: 5, name: "222", stateId: 2 },
    { id: 6, name: "55", stateId: 5 },
    { id: 7, name: "555", stateId: 5},
    { id: 8, name: "44", stateId: 4 },
    { id: 9, name: "444", stateId: 4}
  ];

  countryList: Array<Country> | undefined;
  stateList: Array<State> | undefined;
  cityList: Array<City> | undefined;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initializeFormData();
    this.countryList = this.countries;
    this.stateList = this.states
    this.cityList = this.cities;
    this.formData.controls.stateData.valueChanges.subscribe((value) => {
      console.log("state change : ", value);
    });

  }

  submitForm() {
    this.addDetails();
  }

  onCoutryChange(): void {
    const country: Country = this.formData.controls.countryData.value == null ? new Country() : this.formData.controls.countryData.value;
    console.log('change  ', country);
    const states = this.states.filter(data => data.countryId == country.id);
    this.stateList = states;
    console.log("this.states after country change : ", this.states)
    console.log("this.stateList after country change : ", this.stateList)
  }

  onStateChange(): void {
    const state: State = this.formData.controls.stateData.value == null ? new State() : this.formData.controls.stateData.value;
    console.log('state change  ', state);
    const cities = this.cities.filter(data => data.stateId == state.id);
    this.cityList = cities;
    console.log("cities after country change ,", this.cityList)
  }

  addDetails() {
    if (this.formData.status == 'INVALID') {
      alert('Please fill all fields');
      return;
    }
    console.log("Form Submitted : ", this.formData.status)
    if (this.formDataStore == undefined) {
      this.formDataStore = new Array<LocationDetails>();
    }
    const location = new LocationDetails();
    location.country = this.formData.controls.countryData.value == null ? new Country() : this.formData.controls.countryData.value;
    location.state = this.formData.controls.stateData.value == null ? new State() : this.formData.controls.stateData.value;
    location.city = this.formData.controls.cityData.value == null ? new City() : this.formData.controls.cityData.value;
    this.formDataStore.push(location);
    this.initializeFormData();
  }

  deleteDetails(index: number) {
    if (this.formDataStore) {
      this.formDataStore.splice(index, 1);
      console.log("formDataStore removed : ", this.formDataStore)
    }

  }

  initializeFormData() {
    this.formData = this.fb.group({
      countryData: [null, Validators.required],
      stateData: [null, Validators.required],
      cityData: [null, Validators.required]
    });
  }


}

class Country {
  id: number | undefined;
  name: string | undefined;
}

class State {
  id: number | undefined;
  name: string | undefined;
  countryId: number | undefined;
}


class City {
  id: number | undefined;
  name: string | undefined;
  stateId: number | undefined;
}

class LocationDetails {
  country: Country = new Country;
  state: State = new State;
  city: City = new City;
}
