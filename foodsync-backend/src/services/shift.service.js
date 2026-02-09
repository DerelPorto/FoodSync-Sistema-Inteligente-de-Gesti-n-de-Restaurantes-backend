
import shiftRepository from '../repositories/shift.repository.js';
import employeeRepository from '../repositories/employee.repository.js';
import Shift from '../models/shift.model.js';
import AppError from '../utils/appError.js';

class ShiftService {
    async createShift(data) {
        const shift = new Shift(data);
        shift.validate();

        // Validate that the employee exists
        // We use try/catch because findById throws 404 if not found
        try {
            await employeeRepository.findById(data.employee_id);
        } catch (error) {
            if (error.statusCode === 404) {
                throw new AppError('Employee not found', 404);
            }
            throw error;
        }

        return await shiftRepository.create(data);
    }

    async getAllShifts() {
        return await shiftRepository.findAll();
    }

    async getShiftById(id) {
        return await shiftRepository.findById(id);
    }

    async updateShift(id, updates) {
        return await shiftRepository.update(id, updates);
    }

    async deleteShift(id) {
        return await shiftRepository.delete(id);
    }
}

export default new ShiftService();
