import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class ClientRepository {
    async create(data) {
        const { data: newClient, error } = await supabase
            .from('client')
            .insert(data)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newClient;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('client')
            .select('*')
            .eq('is_active', true);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('client')
            .select('*')
            .eq('client_id', id)
            .eq('is_active', true)
            .single();

        if (error) throw new AppError('Client not found or is inactive', 404);
        return data;
    }

    async findByPhone(phone) {
        const { data, error } = await supabase
            .from('client')
            .select('*')
            .eq('phone', phone)
            .eq('is_active', true)
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data; // Returns null if not found, which is what service usually expects for "check if exists"
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('client')
            .update(updates)
            .eq('client_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        if (!id || id === '{id}') {
            throw new AppError('ID de cliente inválido', 400);
        }

        const { data, error } = await supabase
            .from('client')
            .update({ is_active: false })
            .eq('client_id', id)
            .select() // Returning the updated record is good for confirmation
            .single();

        if (error) {
            if (error.code === '23503') {
                throw new AppError('No se puede eliminar el cliente porque tiene reservaciones registradas.', 400);
            }
            if (error.code === '22P02') {
                throw new AppError('Formato de ID inválido.', 400);
            }
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }
        return data;
    }
}

export default new ClientRepository();
