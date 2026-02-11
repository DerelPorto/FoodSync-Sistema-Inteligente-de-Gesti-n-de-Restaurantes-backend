import shiftRepository from '../repositories/shift.repository.js';
import Shift from '../models/shift.model.js';
import AppError from '../utils/appError.js';

class ShiftService {
    async createShift(data) {
        const shift = new Shift(data);
        shift.validate();

        return await shiftRepository.create({
            employee_id: shift.employee_id,
            date: shift.date,
            start_time: shift.start_time,
            end_time: shift.end_time
        });
    }

    async getAllShifts() {
        return await shiftRepository.findAll();
    }

    async updateShift(id, updates) {
        if (!id || isNaN(id)) throw new AppError('Invalid shift ID', 400);

        const temp = new Shift({ ...updates });
        if (updates.date || updates.start_time || updates.end_time) temp.validate();

        return await shiftRepository.update(id, updates);
    }

    async deleteShift(id) {
        if (!id || isNaN(id)) throw new AppError('Invalid shift ID', 400);
        return await shiftRepository.delete(id);
    }
}

export default new ShiftService();
