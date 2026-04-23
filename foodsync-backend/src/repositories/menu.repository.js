import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class MenuRepository {
    async createMenuItem(itemData) {
        const { data, error } = await supabase
            .from('menu_items')
            .insert(itemData)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async addRecipes(recipesData) {
        const { data, error } = await supabase
            .from('recipes')
            .insert(recipesData)
            .select();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*, recipes(*)')
            .eq('is_active', true);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*, recipes(*)')
            .eq('id', id)
            .single();

        if (error) throw new AppError('Menu item not found', 404);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('menu_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    // Soft Delete
    async delete(id) {
        const { data, error } = await supabase
            .from('menu_items')
            .update({ is_active: false })
            .eq('id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new MenuRepository();
