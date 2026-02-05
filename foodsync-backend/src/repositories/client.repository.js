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
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('client')
            .select('*')
            .eq('client_id', id)
            .single();

        if (error) throw new AppError('Client not found', 404);
        return data;
    }

    async findByPhone(phone) {
        const { data, error } = await supabase
            .from('client')
            .select('*')
            .eq('phone', phone)
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
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
        const { data, error } = await supabase
            .from('client')
            .delete()
            .eq('client_id', id)
            .select() // Returning the deleted record is good for confirmation
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new ClientRepository();
