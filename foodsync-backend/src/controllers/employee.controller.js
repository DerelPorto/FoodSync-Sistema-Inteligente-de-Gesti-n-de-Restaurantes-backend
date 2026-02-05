import employeeService from '../services/employee.service.js';
import catchAsync from '../utils/catchAsync.js';

class EmployeeController {
    createEmployee = catchAsync(async (req, res, next) => {
        const newEmployee = await employeeService.createEmployee(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                employee: newEmployee
            }
        });
    });

    getAllEmployees = catchAsync(async (req, res, next) => {
        const employees = await employeeService.getAllEmployees();

        res.status(200).json({
            status: 'success',
            results: employees.length,
            data: {
                employees: employees
            }
        });
    });

    updateEmployee = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const updates = req.body;

        const updatedEmployee = await employeeService.updateEmployee(id, updates);

        res.status(200).json({
            status: 'success',
            data: {
                employee: updatedEmployee
            }
        });
    });

    deleteEmployee = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await employeeService.deleteEmployee(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new EmployeeController();