
class DailyReport {
    constructor(data) {
        this.report_id = data.report_id;
        this.date = data.date;
        this.total_sales = data.total_sales;
        this.total_reservations = data.total_reservations;
    }

    validate() {
        if (!this.date) {
            throw new Error('Date is required');
        }
        // sales and reservations can be 0, but usually not undefined if we are creating a report
        if (this.total_sales === undefined || this.total_sales < 0) {
            throw new Error('Total sales must be a non-negative number');
        }
        if (this.total_reservations === undefined || this.total_reservations < 0) {
            throw new Error('Total reservations must be a non-negative integer');
        }
    }
}

export default DailyReport;
