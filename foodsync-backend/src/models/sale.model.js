
class Sale {
    constructor(data) {
        this.sale_id = data.sale_id; // Serial, PK
        this.created_at = data.created_at; // Timestamp
        this.total = data.total; // Numeric
        this.items = data.items; // Array of items for logic
    }

    validate() {
        // Basic validation
        if (this.total !== undefined && (isNaN(this.total) || this.total < 0)) {
            throw new Error('Total must be a valid non-negative number');
        }
        // Items validation could happen here or in service, but let's check basic structure
        if (this.items && !Array.isArray(this.items)) {
            throw new Error('Items must be an array');
        }
    }
}

export default Sale;
