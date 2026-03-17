
import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class DailyReportRepository {
    async create(data) {
        const { data: newReport, error } = await supabase
            .from('daily_report')
            .insert(data)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newReport;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('daily_report')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('daily_report')
            .select('*')
            .eq('report_id', id)
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        if (!data) throw new AppError('Daily Report not found', 404);
        return data;
    }

    async findByDate(date) {
        const { data, error } = await supabase
            .from('daily_report')
            .select('*')
            .eq('date', date)
            .maybeSingle();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('daily_report')
            .delete()
            .eq('report_id', id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new AppError('Daily Report not found', 404);
            }
            if (error.code === '22P02') {
                throw new AppError('ID format is invalid', 400);
            }
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }
        return data;
    }
}

export default new DailyReportRepository();
