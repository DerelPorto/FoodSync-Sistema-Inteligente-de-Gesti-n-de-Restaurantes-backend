import shiftService from '../services/shift.service.js';
import catchAsync from '../utils/catchAsync.js';

class ShiftController {
    createShift = catchAsync(async (req, res) => {
        const newShift = await shiftService.createShift(req.body);
        res.status(201).json({ status: 'success', data: { shift: newShift } });
    });

    getAllShifts = catchAsync(async (req, res) => {
        const shifts = await shiftService.getAllShifts();
        res.status(200).json({ status: 'success', results: shifts.length, data: { shifts } });
    });

    updateShift = catchAsync(async (req, res) => {
        const { id } = req.params;
        const updated = await shiftService.updateShift(id, req.body);
        res.status(200).json({ status: 'success', data: { shift: updated } });
    });

    deleteShift = catchAsync(async (req, res) => {
        const { id } = req.params;
        await shiftService.deleteShift(id);
        res.status(204).json({ status: 'success', data: null });
    });
}

export default new ShiftController();
