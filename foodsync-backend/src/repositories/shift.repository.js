
import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class ShiftRepository {
    async create(data) {
        const { data: newShift, error } = await supabase
            .from('shift')
            .insert(data)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newShift;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('shift')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('shift')
            .select('*')
            .eq('shift_id', id)
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        if (!data) throw new AppError('Shift not found', 404);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('shift')
            .update(updates)
            .eq('shift_id', id)
            .select()
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        if (!data) throw new AppError('Shift not found', 404);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('shift')
            .delete()
            .eq('shift_id', id)
            .select()
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        if (!data) throw new AppError('Shift not found', 404);
        return data;
    }
}

export default new ShiftRepository();
