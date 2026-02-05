import employeeRepository from '../repositories/employee.repository.js';
import Employee from '../models/employee.model.js';
import AppError from '../utils/appError.js';

class EmployeeService {
    async createEmployee(data) {
        // Crear instancia del modelo y validar
        const employee = new Employee(data);
        employee.validate();

        // Verificar si ya existe un empleado con el mismo nombre (opcional, dependiendo de reglas de negocio)
        // Aquí podrías agregar lógica adicional, como chequear duplicados

        return await employeeRepository.create({
            name: employee.name,
            position: employee.position
        });
    }

    async getAllEmployees() {
        return await employeeRepository.findAll();
    }

    async updateEmployee(id, updates) {
        // Validar que el ID sea válido
        if (!id || isNaN(id)) throw new AppError('Invalid employee ID', 400);

        // Crear instancia temporal para validar updates (solo campos permitidos)
        const tempEmployee = new Employee({ ...updates });
        if (updates.name || updates.position) {
            tempEmployee.validate();
        }

        return await employeeRepository.update(id, updates);
    }

    async deleteEmployee(id) {
        // Validar que el ID sea válido
        if (!id || isNaN(id)) throw new AppError('Invalid employee ID', 400);

        return await employeeRepository.delete(id);
    }
}

export default new EmployeeService();