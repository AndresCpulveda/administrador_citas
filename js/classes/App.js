import {getData, validateForm} from '../functions.js';
import {
    petInput,
    ownerInput,
    phoneNumberInput,
    dateInput,
    timeInput,
    symptomsInput,
    form,
} from '../selectors.js';

export class App {
    constructor() {
        this.initApp()
    }
    initApp() {
        petInput.addEventListener('input', getData);
        ownerInput.addEventListener('input', getData);
        phoneNumberInput.addEventListener('input', getData);
        dateInput.addEventListener('input', getData);
        timeInput.addEventListener('input', getData);
        symptomsInput.addEventListener('input', getData);
    
        form.addEventListener('submit', validateForm);    
    }
}