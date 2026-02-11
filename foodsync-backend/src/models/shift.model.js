// src/models/shift.model.js
class Shift {
    constructor(data) {
        this.shift_id = data.shift_id;
        this.employee_id = data.employee_id;
        this.date = data.date;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }

    validate() {
        if (!this.date || !this.start_time || !this.end_time) {
            throw new Error('`date`, `start_time` y `end_time` son requeridos');
        }
    }
}

export default Shift;
