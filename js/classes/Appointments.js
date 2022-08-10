export class Appointments {
    constructor() {
        this.appointments = [];
    }
    //Adds the current appointment to the array
    addAppointment(appointment) {
        this.appointments = [...this.appointments, appointment];
    }
    //Filters out the appointment to be deleted an assigns the filtered array as the new one
    deleteAppointment(id) {
        const newList = this.appointments.filter( (cur) =>  cur.id != id);
        this.appointments = newList;
    }
    //Uses map to create a new array that contains the edited object
    editAppointment(appointment) {
        this.appointments = this.appointments.map( (cur) => cur.id === appointment.id ? appointment : cur)//(Note this is an if but in its short form)
    }
}
