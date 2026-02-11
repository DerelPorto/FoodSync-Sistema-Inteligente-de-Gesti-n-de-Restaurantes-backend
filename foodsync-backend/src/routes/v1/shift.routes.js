import express from 'express';
import shiftController from '../../controllers/shift.controller.js';

const router = express.Router();

router
    .route('/')
    .get(shiftController.getAllShifts)
    .post(shiftController.createShift);

router
    .route('/:id')
    .patch(shiftController.updateShift)
    .delete(shiftController.deleteShift);

export default router;
