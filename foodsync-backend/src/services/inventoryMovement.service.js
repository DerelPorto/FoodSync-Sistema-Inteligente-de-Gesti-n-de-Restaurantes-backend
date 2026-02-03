import inventoryMovementRepository from '../repositories/inventoryMovement.repository.js';

class InventoryMovementService {
    async createMovement(data) {
        return await inventoryMovementRepository.create(data);
    }

    async getAllMovements() {
        return await inventoryMovementRepository.findAll();
    }

    async getMovementById(id) {
        return await inventoryMovementRepository.findById(id);
    }

    async getMovementsByProduct(productId) {
        return await inventoryMovementRepository.findByProductId(productId);
    }
}

export default new InventoryMovementService();
