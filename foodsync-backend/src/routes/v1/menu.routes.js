import express from 'express';
import menuController from '../../controllers/menu.controller.js';

const router = express.Router();

router
    .route('/')
    .get(menuController.getAllMenu)
    .post(menuController.createMenu);

router
    .route('/:id')
    .patch(menuController.updatePrice)
    .delete(menuController.deleteMenu);

export default router;
