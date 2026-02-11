import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class RoleRepository {
    async create(roleData) {
        const { data, error } = await supabase
            .from('role')
            .insert(roleData)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase.from('role').select('*');
        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('role')
            .select('*')
            .eq('role_id', id)
            .single();

        if (error) throw new AppError('Role not found', 404);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('role')
            .update(updates)
            .eq('role_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('role')
            .delete()
            .eq('role_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new RoleRepository();
