import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class UserRepository {
    async createUser(userData) {
        const { data, error } = await supabase
            .from('app_user')
            .insert(userData)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('app_user')
            .select('*')
            .eq('active', true);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('app_user')
            .select('*')
            .eq('user_id', id)
            .single();

        if (error) throw new AppError('User not found', 404);
        return data;
    }

    async findByEmail(email) {
        const { data, error } = await supabase
            .from('app_user')
            .select('*')
            .eq('email', email)
            .order('active', { ascending: false }) // prioritize resolving active first
            .limit(1);

        // Don't throw 404 here, just return null or data, let service handle logic
        if (error) { // we replaced .single with .limit(1) so PGRST116 won't be thrown usually
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }

        return data && data.length > 0 ? data[0] : null;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('app_user')
            .update(updates)
            .eq('user_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('app_user')
            .update({ active: false })
            .eq('user_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new UserRepository();
