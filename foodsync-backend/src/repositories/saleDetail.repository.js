
import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class SaleDetailRepository {
    async create(detailData) {
        // detailData can be an array or a single object.
        // If array, insert([])
        const { data, error } = await supabase
            .from('sale_detail')
            .insert(detailData)
            .select();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('sale_detail')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('sale_detail')
            .select('*')
            .eq('sale_detail_id', id)
            .single();

        if (error) throw new AppError('Sale Detail not found', 404);
        return data;
    }

    async findBySaleId(saleId) {
        const { data, error } = await supabase
            .from('sale_detail')
            .select('*')
            .eq('sale_id', saleId);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    // Additional methods if needed for managing details individually
    async update(id, updates) {
        const { data, error } = await supabase
            .from('sale_detail')
            .update(updates)
            .eq('sale_detail_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('sale_detail')
            .delete()
            .eq('sale_detail_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new SaleDetailRepository();
