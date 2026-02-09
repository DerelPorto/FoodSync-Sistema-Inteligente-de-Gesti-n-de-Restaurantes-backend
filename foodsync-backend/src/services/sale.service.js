
import saleRepository from '../repositories/sale.repository.js';
import saleDetailRepository from '../repositories/saleDetail.repository.js';
import Sale from '../models/sale.model.js';
import SaleDetail from '../models/saleDetail.model.js';
import AppError from '../utils/appError.js';

class SaleService {
    async createSale(data) {
        // 1. Validate Sale Input using Model
        const saleModel = new Sale(data);
        saleModel.validate();

        if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
            throw new AppError('Sale must have at least one item', 400);
        }

        let total = 0;
        const validatedItems = [];

        // 2. Validate Items using Model
        for (const item of data.items) {
            const detailModel = new SaleDetail(item);
            detailModel.validate();

            total += item.price * item.quantity;
            validatedItems.push(item);
        }

        // 3. Create Sale Record
        const saleData = {
            total: total,
            created_at: new Date().toISOString()
        };

        const newSale = await saleRepository.create(saleData);
        if (!newSale || !newSale.sale_id) {
            throw new AppError('Failed to create sale', 500);
        }

        // 4. Create Sale Detail Records
        const detailsData = validatedItems.map(item => ({
            sale_id: newSale.sale_id,
            item_name: item.item_name,
            quantity: item.quantity,
            price: item.price
        }));

        const newDetails = await saleDetailRepository.create(detailsData);

        return {
            ...newSale,
            items: newDetails
        };
    }

    async getAllSales() {
        return await saleRepository.findAll();
    }

    async getSaleById(id) {
        const sale = await saleRepository.findById(id);
        const details = await saleDetailRepository.findBySaleId(id);
        return { ...sale, items: details };
    }
}

export default new SaleService();
