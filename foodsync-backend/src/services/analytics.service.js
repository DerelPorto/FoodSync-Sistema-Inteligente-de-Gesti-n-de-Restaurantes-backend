import reservationRepository from '../repositories/reservation.repository.js';
import saleRepository from '../repositories/sale.repository.js';
import saleDetailRepository from '../repositories/saleDetail.repository.js';
import inventoryMovementRepository from '../repositories/inventoryMovement.repository.js';
import productRepository from '../repositories/product.repository.js';

const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/**
 * Filtra reservas/ventas por los últimos N días (desde hoy hacia atrás).
 */
function filterByDays(list, dateField, days) {
    if (!days || days <= 0) return list || [];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(days));
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return (list || []).filter((x) => {
        const raw = x.date || x[dateField] || x.created_at;
        const dateStr = raw ? new Date(raw).toISOString().slice(0, 10) : '';
        return dateStr >= cutoffStr;
    });
}

/**
 * Agrupa reservas por día de la semana (0-6) y por hora.
 * Solo cuenta reservas no canceladas.
 */
function groupReservations(reservations) {
    const active = (reservations || []).filter(r => r.status !== 'cancelled');
    const byDay = {};
    const byHour = {};
    DAYS_ES.forEach((_, i) => { byDay[i] = { day: i, label: DAYS_ES[i], count: 0 }; });
    for (const r of active) {
        const dateStr = r.date;
        if (!dateStr) continue;
        const d = new Date(dateStr + 'T12:00:00');
        const dayOfWeek = d.getDay();
        byDay[dayOfWeek].count += 1;
        const time = (r.time || '').toString().replace(':', '.');
        const hourKey = parseFloat(time) || 0;
        if (!byHour[hourKey]) byHour[hourKey] = { time: r.time || hourKey.toString(), count: 0 };
        byHour[hourKey].count += 1;
    }
    return {
        byDayOfWeek: Object.values(byDay).sort((a, b) => a.day - b.day),
        byHour: Object.entries(byHour).map(([k, v]) => ({ ...v, hour: parseFloat(k) })).sort((a, b) => a.hour - b.hour),
        totalReservations: active.length,
    };
}

/**
 * Agrupa ventas por fecha (created_at) y totales.
 */
function groupSales(sales) {
    const list = sales || [];
    const byDate = {};
    let totalRevenue = 0;
    for (const s of list) {
        const raw = s.created_at || s.sale_date;
        const dateStr = raw ? new Date(raw).toISOString().slice(0, 10) : null;
        if (!dateStr) continue;
        if (!byDate[dateStr]) byDate[dateStr] = { date: dateStr, count: 0, total: 0 };
        byDate[dateStr].count += 1;
        const t = Number(s.total);
        byDate[dateStr].total += isNaN(t) ? 0 : t;
        totalRevenue += isNaN(t) ? 0 : t;
    }
    const byDay = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
    return { byDay, totalRevenue, totalSales: list.length };
}

/**
 * Top ítems vendidos (por item_name en sale_detail).
 */
function groupTopItems(saleDetails) {
    const list = saleDetails || [];
    const byName = {};
    for (const d of list) {
        const name = (d.item_name || 'Sin nombre').trim();
        if (!byName[name]) byName[name] = { name, quantity: 0 };
        byName[name].quantity += Number(d.quantity) || 0;
    }
    return Object.values(byName)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
}

/**
 * Productos con más salidas de inventario (patrón de consumo).
 * Incluye stock actual si existe en producto.
 */
function groupInventoryOutflows(movements, products) {
    const list = (movements || []).filter(m => m.movement_type === 'out');
    const byProduct = {};
    for (const m of list) {
        const id = m.product_id;
        if (!byProduct[id]) byProduct[id] = { product_id: id, quantity: 0 };
        byProduct[id].quantity += Number(m.quantity) || 0;
    }
    const productMap = {};
    (products || []).forEach(p => {
        const id = p.product_id ?? p.id;
        productMap[id] = { name: p.name || 'Producto', stock: p.stock != null ? Number(p.stock) : null };
    });
    return Object.entries(byProduct)
        .map(([id, o]) => ({
            ...o,
            product_name: productMap[id]?.name || `ID ${id}`,
            current_stock: productMap[id]?.stock ?? null,
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
}

/**
 * Demanda esperada por día de la semana (promedio según histórico).
 */
function computeDemandForecast(reservationsData, salesData) {
    const byDayRes = (reservationsData?.byDayOfWeek || []).reduce((acc, x) => { acc[x.day] = x.count; return acc; }, {});
    const weeksRes = Math.max(1, Math.ceil((reservationsData?.totalReservations || 0) / 7));
    const byDaySales = {};
    const byDayRevenue = {};
    (salesData?.byDay || []).forEach((x) => {
        const d = new Date(x.date + 'T12:00:00').getDay();
        byDaySales[d] = (byDaySales[d] || 0) + x.count;
        byDayRevenue[d] = (byDayRevenue[d] || 0) + x.total;
    });
    const weeksSales = Math.max(1, (salesData?.byDay || []).length / 7);
    return DAYS_ES.map((label, day) => ({
        dayOfWeek: day,
        label,
        expectedReservations: Math.round((byDayRes[day] || 0) / weeksRes),
        expectedSalesCount: Math.round((byDaySales[day] || 0) / weeksSales),
        expectedRevenue: Math.round((byDayRevenue[day] || 0) / weeksSales),
    }));
}

/**
 * Sugerencias de optimización: reservas, personal, inventario.
 */
function computeSuggestions(reservationsData, inventoryOutflows) {
    const suggestions = { reservations: [], staff: [], inventory: [] };
    const byDay = reservationsData?.byDayOfWeek || [];
    const byHour = reservationsData?.byHour || [];

    if (byDay.length && byHour.length) {
        const peakDay = byDay.reduce((a, b) => (b.count > a.count ? b : a), byDay[0]);
        const peakHour = byHour.reduce((a, b) => (b.count > a.count ? b : a), byHour[0]);
        if (peakDay.count > 0) {
            suggestions.reservations.push({
                type: 'capacity',
                message: `Alta demanda los ${peakDay.label} a las ${peakHour.time}. Optimización: mantén más mesas disponibles y evita sobrecarga en esa franja.`,
                day: peakDay.label,
                time: peakHour.time,
            });
        }
        const recommendedStaff = peakHour.count > 0 ? Math.max(2, Math.ceil(peakHour.count / 2) + 1) : 0;
        if (recommendedStaff > 0) {
            suggestions.staff.push({
                type: 'shift',
                message: `Para ${peakDay.label} a las ${peakHour.time} se recomienda al menos ${recommendedStaff} empleados en sala (según ${peakHour.count} reservas habituales).`,
                day: peakDay.label,
                time: peakHour.time,
                recommendedCount: recommendedStaff,
            });
        }
    }

    (inventoryOutflows || []).slice(0, 5).forEach((p) => {
        const suggestQty = Math.max(p.quantity, 10);
        const hasLowStock = p.current_stock != null && p.current_stock < suggestQty;
        suggestions.inventory.push({
            product_id: p.product_id,
            product_name: p.product_name,
            message: hasLowStock
                ? `Reponer "${p.product_name}": stock actual ${p.current_stock}, consumo reciente ${p.quantity} u. Sugerencia: pedir al menos ${suggestQty} unidades.`
                : `Priorizar reposición de "${p.product_name}" (consumo reciente: ${p.quantity} u). Sugerencia: pedir al menos ${suggestQty} unidades.`,
            suggestedOrderQuantity: suggestQty,
            recentConsumption: p.quantity,
            current_stock: p.current_stock,
        });
    });

    return suggestions;
}

class AnalyticsService {
    async getReservationsPatterns() {
        const reservations = await reservationRepository.findAll();
        return groupReservations(reservations);
    }

    async getSalesPatterns() {
        const sales = await saleRepository.findAll();
        return groupSales(sales);
    }

    async getTopItems() {
        const details = await saleDetailRepository.findAll();
        return { topItems: groupTopItems(details) };
    }

    async getInventoryInsights() {
        const [movements, products] = await Promise.all([
            inventoryMovementRepository.findAll(),
            productRepository.findAll(),
        ]);
        return { topOutflows: groupInventoryOutflows(movements, products) };
    }

    async getDashboard(days) {
        const [reservations, sales, details, movements, products] = await Promise.all([
            reservationRepository.findAll(),
            saleRepository.findAll(),
            saleDetailRepository.findAll(),
            inventoryMovementRepository.findAll(),
            productRepository.findAll(),
        ]);
        const reservationsFiltered = filterByDays(reservations, 'date', days);
        const salesFiltered = filterByDays(sales, 'created_at', days);
        const saleIds = new Set((salesFiltered.length ? salesFiltered : sales || []).map(s => s.sale_id ?? s.id));
        const detailsFiltered = (details || []).filter(d => saleIds.has(d.sale_id));
        const movementsFiltered = filterByDays(movements, 'created_at', days);
        const reservationsData = groupReservations(reservationsFiltered);
        const salesData = groupSales(salesFiltered);
        const topItems = groupTopItems(detailsFiltered.length ? detailsFiltered : details);
        const inventoryOutflows = groupInventoryOutflows(days ? movementsFiltered : movements, products);
        const demandForecast = computeDemandForecast(reservationsData, salesData);
        const suggestions = computeSuggestions(reservationsData, inventoryOutflows);
        return {
            reservations: reservationsData,
            sales: salesData,
            topItems,
            inventoryOutflows,
            demandForecast,
            suggestions,
            filterDays: days || null,
        };
    }

    async getKpis() {
        const [reservations, sales, products] = await Promise.all([
            reservationRepository.findAll(),
            saleRepository.findAll(),
            productRepository.findAll(),
        ]);
        const today = new Date().toISOString().slice(0, 10);
        const reservationsToday = (reservations || []).filter(r => r.status !== 'cancelled' && r.date === today).length;
        const now = new Date();
        const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
        const lastDayMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
        let salesThisMonthCount = 0;
        let salesThisMonthRevenue = 0;
        (sales || []).forEach(s => {
            const d = (s.created_at || s.sale_date) ? new Date(s.created_at || s.sale_date).toISOString().slice(0, 10) : '';
            if (d >= firstDayMonth && d <= lastDayMonth) {
                salesThisMonthCount += 1;
                salesThisMonthRevenue += Number(s.total) || 0;
            }
        });
        const lowStockThreshold = Number(process.env.LOW_STOCK_THRESHOLD) || 10;
        const lowStockProducts = (products || []).filter(p => p.stock != null && Number(p.stock) < lowStockThreshold);
        return {
            reservationsToday,
            salesThisMonthCount,
            salesThisMonthRevenue,
            lowStockCount: lowStockProducts.length,
            lowStockProducts: lowStockProducts.slice(0, 10).map(p => ({ product_id: p.product_id ?? p.id, name: p.name, stock: p.stock })),
        };
    }
}

export default new AnalyticsService();
