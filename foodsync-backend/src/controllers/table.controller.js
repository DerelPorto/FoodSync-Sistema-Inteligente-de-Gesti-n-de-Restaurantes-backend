import tableService from '../services/table.service.js';
import catchAsync from '../utils/catchAsync.js';

class TableController {
    createTable = catchAsync(async (req, res, next) => {
        const newTable = await tableService.createTable(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                table: newTable
            }
        });
    });

    getAllTables = catchAsync(async (req, res, next) => {
        const tables = await tableService.getAllTables();

        res.status(200).json({
            status: 'success',
            results: tables.length,
            data: {
                tables
            }
        });
    });

    getTable = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const table = await tableService.getTableById(id);

        res.status(200).json({
            status: 'success',
            data: {
                table
            }
        });
    });

    updateTable = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const updatedTable = await tableService.updateTable(id, req.body);

        res.status(200).json({
            status: 'success',
            data: {
                table: updatedTable
            }
        });
    });

    deleteTable = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await tableService.deleteTable(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new TableController();
