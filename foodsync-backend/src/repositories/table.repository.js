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

    async findAvailableByCapacity(peopleCount, date, time) {
        // 1. Get all tables with sufficient capacity
        const { data: tables, error } = await supabase
            .from('restaurant_table')
            .select('*')
            .gte('capacity', peopleCount)
            .order('table_number', { ascending: true });

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);

        // 2. Find table IDs already reserved at that exact date & time (non-cancelled)
        const { data: conflicting, error: resError } = await supabase
            .from('reservation')
            .select('table_id')
            .eq('date', date)
            .eq('time', time)
            .neq('status', 'cancelled');

        if (resError) throw new AppError(`Supabase Error: ${resError.message}`, 500);

        const busyIds = new Set(conflicting.map(r => r.table_id));

        // 3. Return only tables that are NOT in the busy set
        return tables.filter(t => !busyIds.has(t.table_id));
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
