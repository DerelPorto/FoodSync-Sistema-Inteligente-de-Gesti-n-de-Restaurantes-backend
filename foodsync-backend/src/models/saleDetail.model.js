
class SaleDetail {
    constructor(data) {
        this.sale_detail_id = data.sale_detail_id; // Serial, PK
        this.sale_id = data.sale_id; // FK
        this.item_name = data.item_name; // String
        this.quantity = data.quantity; // Int
        this.price = data.price; // Numeric
    }

    validate() {
        if (!this.item_name || typeof this.item_name !== 'string') {
            throw new Error('Item name is required and must be a string');
        }
        if (!this.quantity || isNaN(this.quantity) || this.quantity <= 0) {
            throw new Error('Quantity must be a positive integer');
        }
        if (this.price === undefined || this.price === null || Number.isNaN(Number(this.price)) || Number(this.price) < 0) {
            throw new Error('Price must be a non-negative number');
        }
    }
}

export default SaleDetail;
