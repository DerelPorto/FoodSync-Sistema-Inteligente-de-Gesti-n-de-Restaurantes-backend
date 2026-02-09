
import shiftService from '../services/shift.service.js';
import catchAsync from '../utils/catchAsync.js';

class ShiftController {
    createShift = catchAsync(async (req, res, next) => {
        const newShift = await shiftService.createShift(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                shift: newShift
            }
        });
    });

    getAllShifts = catchAsync(async (req, res, next) => {
        const shifts = await shiftService.getAllShifts();

        res.status(200).json({
            status: 'success',
            results: shifts.length,
            data: {
                shifts: shifts
            }
        });
    });


    getShiftById = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid ID format' });
        }
        const shift = await shiftService.getShiftById(id);

        res.status(200).json({
            status: 'success',
            data: {
                shift: shift
            }
        });
    });

    updateShift = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid ID format' });
        }
        const updatedShift = await shiftService.updateShift(id, req.body);

        res.status(200).json({
            status: 'success',
            data: {
                shift: updatedShift
            }
        });
    });

    deleteShift = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid ID format' });
        }
        await shiftService.deleteShift(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new ShiftController();
