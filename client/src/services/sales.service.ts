
import api from './api';

export interface SaleItem {
    item_name: string;
    quantity: number;
    price: number;
}

export interface Sale {
    sale_id: number;
    created_at: string;
    total: number;
    items?: SaleItem[]; // Depending on if your backend returns this in the list view
}

export const salesService = {
    async getAllSales(): Promise<Sale[]> {
        const response = await api.get<{ data: { sales: Sale[] } }>('/sales');
        return response.data.data.sales;
    },

    async getSaleById(id: number): Promise<Sale> {
        const response = await api.get<{ data: { sale: Sale } }>(`/sales/${id}`);
        return response.data.data.sale;
    }
};
