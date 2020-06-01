import {getUniqueValues} from './utils.js';

export default class Select{
  constructor(target, data){
    this.target = document.getElementById(target);
    this.data = data;
    this.render();
  }

  createOptions(){
    let allCountries = getUniqueValues(this.data, 'country');
    let fragment = document.createDocumentFragment();

    for(let country of allCountries){
      let opt = document.createElement('option');
      opt.value = country;
      opt.textContent = country.toUpperCase();
      fragment.appendChild(opt)
    }

    this.target.appendChild(fragment);
  }

  render(){
    this.createOptions();
  }
}