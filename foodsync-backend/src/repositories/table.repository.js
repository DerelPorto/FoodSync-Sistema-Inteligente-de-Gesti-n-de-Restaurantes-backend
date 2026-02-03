import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class TableRepository {
    async create(data) {
        const { data: newTable, error } = await supabase
            .from('restaurant_table')
            .insert(data)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newTable;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('restaurant_table')
            .select('*')
            .order('table_number', { ascending: true });

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('restaurant_table')
            .select('*')
            .eq('table_id', id)
            .single();

        if (error) throw new AppError('Table not found', 404);
        return data;
    }

    async findByTableNumber(tableNumber) {
        const { data, error } = await supabase
            .from('restaurant_table')
            .select('*')
            .eq('table_number', tableNumber)
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('restaurant_table')
            .update(updates)
            .eq('table_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('restaurant_table')
            .delete()
            .eq('table_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new TableRepository();
