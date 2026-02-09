
import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class SaleRepository {
    async create(saleData) {
        const { data, error } = await supabase
            .from('sale')
            .insert(saleData)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('sale')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('sale')
            .select('*')
            .eq('sale_id', id)
            .single();

        if (error) throw new AppError('Sale not found', 404);
        return data;
    }

    // Usually sales are not updated or deleted casually, but for completeness:
    async update(id, updates) {
        const { data, error } = await supabase
            .from('sale')
            .update(updates)
            .eq('sale_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('sale')
            .delete()
            .eq('sale_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new SaleRepository();
