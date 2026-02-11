import express from 'express';
import roleController from '../../controllers/role.controller.js';

const router = express.Router();

router
    .route('/')
    .get(roleController.getAllRoles)
    .post(roleController.createRole);

router
    .route('/:id')
    .patch(roleController.updateRole)
    .delete(roleController.deleteRole);

export default router;
