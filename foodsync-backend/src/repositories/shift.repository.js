import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class ShiftRepository {
    async create(shiftData) {
        const { data, error } = await supabase
            .from('shift')
            .insert(shiftData)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase.from('shift').select('*');
        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('shift')
            .select('*')
            .eq('shift_id', id)
            .single();

        if (error) throw new AppError('Shift not found', 404);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('shift')
            .update(updates)
            .eq('shift_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('shift')
            .delete()
            .eq('shift_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new ShiftRepository();
