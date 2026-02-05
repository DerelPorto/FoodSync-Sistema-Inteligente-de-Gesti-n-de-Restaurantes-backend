import express from 'express';
const router = express.Router();

import menuRoutes from './menu.routes.js';
import employeeRoutes from './employee.routes.js';

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is healthy' });
});

router.use('/menu', menuRoutes);
router.use('/employee', employeeRoutes);

export default router;
