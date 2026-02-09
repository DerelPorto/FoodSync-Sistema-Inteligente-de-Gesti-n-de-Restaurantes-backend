
import saleDetailRepository from '../repositories/saleDetail.repository.js';
import AppError from '../utils/appError.js';

class SaleDetailService {
    async getAllDetails() {
        return await saleDetailRepository.findAll();
    }

    async getDetailById(id) {
        return await saleDetailRepository.findById(id);
    }

    async getDetailsBySaleId(saleId) {
        return await saleDetailRepository.findBySaleId(saleId);
    }
}

export default new SaleDetailService();
