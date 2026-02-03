import inventoryMovementService from '../services/inventoryMovement.service.js';
import catchAsync from '../utils/catchAsync.js';

class InventoryMovementController {
    createMovement = catchAsync(async (req, res) => {
        const movement = await inventoryMovementService.createMovement(req.body);

        res.status(201).json({
            status: 'success',
            data: { movement }
        });
    });

    getAllMovements = catchAsync(async (req, res) => {
        const movements = await inventoryMovementService.getAllMovements();

        res.status(200).json({
            status: 'success',
            results: movements.length,
            data: { movements }
        });
    });

    getMovementById = catchAsync(async (req, res) => {
        const movement = await inventoryMovementService.getMovementById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { movement }
        });
    });

    getMovementsByProduct = catchAsync(async (req, res) => {
        const movements = await inventoryMovementService.getMovementsByProduct(req.params.productId);

        res.status(200).json({
            status: 'success',
            results: movements.length,
            data: { movements }
        });
    });
}

export default new InventoryMovementController();
