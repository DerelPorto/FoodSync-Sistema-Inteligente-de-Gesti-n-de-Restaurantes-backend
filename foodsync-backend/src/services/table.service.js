import tableRepository from '../repositories/table.repository.js';
import AppError from '../utils/appError.js';

class TableService {
    async createTable(data) {
        if (!data.table_number || !data.capacity) {
            throw new AppError('Table number and capacity are required', 400);
        }

        // Check validation for duplicate table number
        const existingTable = await tableRepository.findByTableNumber(data.table_number);
        if (existingTable) {
            throw new AppError(`Table number ${data.table_number} already exists`, 400);
        }

        return await tableRepository.create(data);
    }

    async getAllTables() {
        return await tableRepository.findAll();
    }

    async getTableById(id) {
        return await tableRepository.findById(id);
    }

    async updateTable(id, updates) {
        // If updating table number, check specifically
        if (updates.table_number) {
            const existingTable = await tableRepository.findByTableNumber(updates.table_number);
            if (existingTable && existingTable.table_id != id) {
                throw new AppError(`Table number ${updates.table_number} already exists`, 400);
            }
        }
        return await tableRepository.update(id, updates);
    }

    async deleteTable(id) {
        return await tableRepository.delete(id);
    }
}

export default new TableService();
