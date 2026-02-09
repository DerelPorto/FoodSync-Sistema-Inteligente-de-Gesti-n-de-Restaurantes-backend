
import saleService from '../services/sale.service.js';
import catchAsync from '../utils/catchAsync.js';

class SaleController {
    createSale = catchAsync(async (req, res, next) => {
        const newSale = await saleService.createSale(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                sale: newSale
            }
        });
    });

    getAllSales = catchAsync(async (req, res, next) => {
        const sales = await saleService.getAllSales();

        res.status(200).json({
            status: 'success',
            results: sales.length,
            data: {
                sales: sales
            }
        });
    });

    getSaleById = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const sale = await saleService.getSaleById(id);

        res.status(200).json({
            status: 'success',
            data: {
                sale: sale
            }
        });
    });
}

export default new SaleController();
