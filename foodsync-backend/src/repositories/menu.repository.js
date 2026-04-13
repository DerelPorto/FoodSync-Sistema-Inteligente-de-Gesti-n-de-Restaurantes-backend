import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class MenuRepository {
    async createMenuItem(itemData) {
        const { data, error } = await supabase
<<<<<<< HEAD
            .from('menu_item')
=======
            .from('menu_items')
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
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
<<<<<<< HEAD
            .from('menu_item')
=======
            .from('menu_items')
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
            .select('*, recipes(*)')
            .eq('is_active', true);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
<<<<<<< HEAD
            .from('menu_item')
=======
            .from('menu_items')
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
            .select('*, recipes(*)')
            .eq('id', id)
            .single();

        if (error) throw new AppError('Menu item not found', 404);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
<<<<<<< HEAD
            .from('menu_item')
=======
            .from('menu_items')
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
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
<<<<<<< HEAD
            .from('menu_item')
=======
            .from('menu_items')
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
            .update({ is_active: false })
            .eq('id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new MenuRepository();
