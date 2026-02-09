
import saleDetailService from '../services/saleDetail.service.js';
import catchAsync from '../utils/catchAsync.js';

class SaleDetailController {
    getAllDetails = catchAsync(async (req, res, next) => {
        const details = await saleDetailService.getAllDetails();

        res.status(200).json({
            status: 'success',
            results: details.length,
            data: {
                saleDetails: details
            }
        });
    });

    getDetailById = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const detail = await saleDetailService.getDetailById(id);

        res.status(200).json({
            status: 'success',
            data: {
                saleDetail: detail
            }
        });
    });
}

export default new SaleDetailController();
