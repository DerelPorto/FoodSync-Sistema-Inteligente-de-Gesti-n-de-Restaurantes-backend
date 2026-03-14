import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class InventoryMovementRepository {
    async create(data) {
        const { movement_type, ...rest } = data;
        const normalizedType = ['IN', 'in', 'entrada', 'ENTRADA'].includes(movement_type) ? 'in' : 'out';
        const payload = { ...rest, movement_type: normalizedType };

        const { data: newMovement, error } = await supabase
            .from('inventory_movement')
            .insert(payload)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newMovement;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('inventory_movement')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('inventory_movement')
            .select('*')
            .eq('movement_id', id)
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        if (!data) throw new AppError('Inventory movement not found', 404);
        return data;
    }

    async findByProductId(productId) {
        const { data, error } = await supabase
            .from('inventory_movement')
            .select('*')
            .eq('product_id', productId)
            .order('created_at', { ascending: false });

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new InventoryMovementRepository();
