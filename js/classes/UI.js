import {appointmentsContainer} from '../selectors.js'
import {deleteAppointment, loadEdition} from '../functions.js'

export default class UI {
    //Shows a given message and assigns classes to it according to the given type, the message auto deletes after 3 seconds
    showMessage(message, type) {
        const divAlert = document.createElement('div');
        divAlert.classList.add('alert', 'text-uppercase', 'd-block', 'text-center', 'col-12')
        if(type == 'error') {
            divAlert.classList.add('alert-danger');
            divAlert.textContent = message;
        }else{
            divAlert.classList.add('alert-success')
            divAlert.textContent = message;
        }
        document.querySelector('#contenido').insertBefore(divAlert, document.querySelector('.agregar-cita'))
        setTimeout( () => {
            divAlert.remove();
        }, 3000)
    }
    //Scripting of the HTML needed to show all the appointments in the UI
    showAppointments({appointments}) { //The parameter is passed as an object so it can access the array directly, since it has the same name (watch video 184)
        this.cleanHTML();
        appointments.forEach( (cur) => {
            const {pet, owner, phone, date, time, symptoms, id} = cur;
            const appointmentItem = document.createElement('div');
            appointmentItem.classList.add('cita', 'p-3');
            appointmentItem.dataset.id = id; //We set the id of the appointment as an attribute

            const petText = document.createElement('h2');
            petText.classList.add('card-title', 'font-weight-bolder', 'text-capitalize')
            petText.textContent = pet;

            const ownerText = document.createElement('p');
            ownerText.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${owner}
            `;

            const phoneText = document.createElement('p');
            phoneText.innerHTML = `
                <span class="font-weight-bolder">Telefono:</span> ${phone}
            `;

            const dateText = document.createElement('p');
            dateText.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${date}
            `;

            const timeText = document.createElement('p');
            timeText.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${time}
            `;

            const symptomsText = document.createElement('p');
            symptomsText.innerHTML = `
                <span class="font-weight-bolder">Sintomas:</span> ${symptoms}
            `;
            //All the child elements of the div get appended in it before appending the div itself
            appointmentItem.appendChild(petText);
            appointmentItem.appendChild(ownerText);
            appointmentItem.appendChild(phoneText);
            appointmentItem.appendChild(dateText);
            appointmentItem.appendChild(timeText);
            appointmentItem.appendChild(symptomsText);

            appointmentsContainer.appendChild(appointmentItem);

            //Button elements include icons and on-click functions
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'text-uppercase', 'm-1');
            deleteBtn.innerHTML = `eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
            deleteBtn.onclick = () => deleteAppointment(id)
            appointmentItem.appendChild(deleteBtn)

            const editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-info', 'text-uppercase', 'm-1');
            editBtn.innerHTML = `editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`
            editBtn.onclick = () => loadEdition(cur);
            appointmentItem.appendChild(editBtn)
        })
    }
    //Deletes the elements created in the html so they dont get duplicated
    cleanHTML() {
        while(appointmentsContainer.firstChild) {
            appointmentsContainer.removeChild(appointmentsContainer.firstChild);
        }
    }

}
