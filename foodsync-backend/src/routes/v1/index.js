import express from 'express';
const router = express.Router();

import menuRoutes from './menu.routes.js';
import employeeRoutes from './employee.routes.js';
import roleRoutes from './role.routes.js';
import shiftRoutes from './shift.routes.js';

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy' });
});

router.use('/menu', menuRoutes);
router.use('/employee', employeeRoutes);
router.use('/role', roleRoutes);
router.use('/shift', shiftRoutes);

export default router;
