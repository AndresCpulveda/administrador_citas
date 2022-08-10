import UI from './classes/UI.js'
import {Appointments} from './classes/Appointments.js'
import {
    petInput,
    ownerInput,
    phoneNumberInput,
    dateInput,
    timeInput,
    symptomsInput,
    form,
} from './selectors.js';


let editing;

//Object will be filled with the inputs' values
const appointmentObj = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    time: '',
    symptoms: '',
}

const ui = new UI();
const manageAppointment = new Appointments();

//Functions
export function getData(e) {
    appointmentObj[e.target.name] = e.target.value; //Assigns the value of the targeted input to the object's property, which is selected from the name attribute of the input element in the HTML (watch videos 181-182)
}
//Validates the values of the object's properties and validates if the object is being edited or created using the 'editing' variable
export function validateForm(e) {
    e.preventDefault();
    const {pet, owner, phone, date, time, symptoms} = appointmentObj;//Destructuring
    if(pet === '' || owner === '' || phone === '' || date === '' || time === '' || symptoms === ''){
        ui.showMessage('Todos los campos son obligatorios', 'error')
        return;
    }
    if(editing) { //If true the the values most be edited from the array and shown
        manageAppointment.editAppointment({...appointmentObj});//The parameter is submited as object to avoid duplicates in the array (watch video 183)
        ui.showMessage('Cita editada exitosamente')
        
        //Change button text
        form.querySelector('button[type="submit"]').textContent = 'Crear Cita'
        editing = false;

    }else{
        ui.showMessage('Cita creada')
        appointmentObj.id = Date.now(); //Uses the date now to creata a unique id for the object
        manageAppointment.addAppointment({...appointmentObj}); //The parameter is submited as object to avoid duplicates in the array (watch video 183)
    }

    form.reset();
    ui.showAppointments(manageAppointment);
    resetObj();
}
//Assigns all the values of the properties back to blank
function resetObj() {
    appointmentObj.pet = ''
    appointmentObj.owner = ''
    appointmentObj.phone = ''
    appointmentObj.date = ''
    appointmentObj.time = ''
    appointmentObj.symptoms = ''
}
//Goes through the methods needed to delete the appointment from the array and the HTML
export function deleteAppointment(id) {
    manageAppointment.deleteAppointment(id);
    ui.showMessage('Cita eliminada')
    ui.showAppointments(manageAppointment);
}
//Re assigns the values of the inputs in the HTML so they can be edited as well as the values on the object
export function loadEdition(appointment) {
    const {pet, owner, phone, date, time, symptoms, id} = appointment;

    //Fill the inputs back
    petInput.value = pet;
    ownerInput.value = owner;
    phoneNumberInput.value = phone;
    dateInput.value = date;
    timeInput.value = time;
    symptomsInput.value = symptoms;

    //Fill the object back
    appointmentObj.pet = pet;
    appointmentObj.owner = owner;
    appointmentObj.phone = phone;
    appointmentObj.date = date;
    appointmentObj.time = time;
    appointmentObj.symptoms = symptoms;
    appointmentObj.id = id;

    //Change button text
    form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'

    editing = true;
}