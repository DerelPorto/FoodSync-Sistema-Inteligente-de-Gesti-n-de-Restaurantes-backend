import express from 'express';
const router = express.Router();

import menuRoutes from './menu.routes.js';
<<<<<<< HEAD
import userRoutes from './user.routes.js';
import reservationRoutes from './reservation.routes.js';
import clientRoutes from './client.routes.js';
import tableRoutes from './table.routes.js';
import inventoryMovementRoutes from './inventoryMovement.routes.js';
import productRoutes from './product.routes.js';
import employeeRoutes from './employee.routes.js';
import saleRoutes from './sale.routes.js';
import saleDetailRoutes from './saleDetail.routes.js';
import shiftRoutes from './shift.routes.js';
import dailyReportRoutes from './dailyReport.routes.js';
import authRoutes from './auth.routes.js';
import analyticsRoutes from './analytics.routes.js';
=======
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy' });
});

router.use('/menu', menuRoutes);
<<<<<<< HEAD
router.use('/users', userRoutes);
router.use('/reservations', reservationRoutes);
router.use('/clients', clientRoutes);
router.use('/tables', tableRoutes);
router.use('/employee', employeeRoutes);
router.use('/inventory-movements', inventoryMovementRoutes);
router.use('/products', productRoutes);
router.use('/sales', saleRoutes);
router.use('/sale-details', saleDetailRoutes);
router.use('/shifts', shiftRoutes);
router.use('/daily-reports', dailyReportRoutes);
router.use('/auth', authRoutes);
router.use('/analytics', analyticsRoutes);
=======
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)

export default router;
