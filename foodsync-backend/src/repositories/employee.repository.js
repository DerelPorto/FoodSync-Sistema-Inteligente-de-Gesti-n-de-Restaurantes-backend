import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class EmployeeRepository {
    async create(employeeData) {
        const { data, error } = await supabase
            .from('employee')
            .insert(employeeData)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('employee')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('employee')
            .select('*')
            .eq('employee_id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new AppError('Employee not found', 404);
            }
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('employee')
            .update(updates)
            .eq('employee_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('employee')
            .delete()
            .eq('employee_id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '23503') {
                throw new AppError('No se puede eliminar el empleado porque tiene turnos asignados u otros registros dependientes.', 400);
            }
            if (error.code === '22P02') {
                throw new AppError('Formato de ID inválido.', 400);
            }
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }
        return data;
    }
}

export default new EmployeeRepository();