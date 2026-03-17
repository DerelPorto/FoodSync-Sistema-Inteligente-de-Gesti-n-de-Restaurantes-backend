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
            .eq('is_active', true)
            .order('table_number', { ascending: true });

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('restaurant_table')
            .select('*')
            .eq('table_id', id)
            .eq('is_active', true)
            .single();

        if (error) throw new AppError('Table not found or is inactive', 404);
        return data;
    }

    async findByTableNumber(tableNumber) {
        const { data, error } = await supabase
            .from('restaurant_table')
            .select('*')
            .eq('table_number', tableNumber)
            .order('is_active', { ascending: false }) // prioritize resolving active first
            .limit(1);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data && data.length > 0 ? data[0] : null;
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
            .eq('is_active', true)
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
        if (!id || id === '{id}') {
            throw new AppError('ID de mesa inválido', 400);
        }

        const { data, error } = await supabase
            .from('restaurant_table')
            .update({ is_active: false })
            .eq('table_id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '22P02') {
                throw new AppError('Formato de ID inválido.', 400);
            }
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }

        return data;
    }
}

export default new TableRepository();
