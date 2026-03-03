import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class ReservationRepository {
    async create(data) {
        const { data: newReservation, error } = await supabase
            .from('reservation')
            .insert(data)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newReservation;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('reservation')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('reservation')
            .select('*')
            .eq('reservation_id', id)
            .single();

        if (error) throw new AppError('Reservation not found', 404);
        return data;
    }

    async findByClient(clientId) {
        const { data, error } = await supabase
            .from('reservation')
            .select('*')
            .eq('client_id', clientId);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('reservation')
            .update(updates)
            .eq('reservation_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findOverlapping(tableId, date, time) {
        const { data, error } = await supabase
            .from('reservation')
            .select('reservation_id')
            .eq('table_id', tableId)
            .eq('date', date)
            .eq('time', time)
            .neq('status', 'cancelled');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data; // length > 0 means there is a conflict
    }

    async delete(id) {
        // Assuming hard delete for now or status update to 'cancelled' if soft delete preferred, but schema implies just status. 
        // Let's implement status update to cancelled as a 'delete' action or just provide update.
        // But usually delete means delete or soft delete. Let's do a soft delete by setting status to 'cancelled' if that's the intention, 
        // OR actual delete row. 
        // Given previous pattern (user/menu), let's assume we might want to just update status to 'cancelled' primarily.
        // However, standard delete endpoint usually expects removal or hiding.
        // Let's stick to update status for logic, but maybe a delete method for admin cleanup?
        // Let's implement actual delete for now but service layer can decide to use update status instead.

        const { data, error } = await supabase
            .from('reservation')
            .delete()
            .eq('reservation_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }
}

export default new ReservationRepository();
