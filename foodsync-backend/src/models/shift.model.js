
class Shift {
    constructor(data) {
        this.shift_id = data.shift_id;
        this.employee_id = data.employee_id;
        this.date = data.date;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }

    validate() {
        if (!this.employee_id) {
            throw new Error('Employee ID is required');
        }
        if (!this.date) {
            throw new Error('Date is required');
        }
        if (!this.start_time) {
            throw new Error('Start time is required');
        }
        if (!this.end_time) {
            throw new Error('End time is required');
        }
    }
}

export default Shift;
