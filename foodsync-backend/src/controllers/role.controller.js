import roleService from '../services/role.service.js';
import catchAsync from '../utils/catchAsync.js';

class RoleController {
    createRole = catchAsync(async (req, res) => {
        const newRole = await roleService.createRole(req.body);
        res.status(201).json({ status: 'success', data: { role: newRole } });
    });

    getAllRoles = catchAsync(async (req, res) => {
        const roles = await roleService.getAllRoles();
        res.status(200).json({ status: 'success', results: roles.length, data: { roles } });
    });

    updateRole = catchAsync(async (req, res) => {
        const { id } = req.params;
        const updated = await roleService.updateRole(id, req.body);
        res.status(200).json({ status: 'success', data: { role: updated } });
    });

    deleteRole = catchAsync(async (req, res) => {
        const { id } = req.params;
        await roleService.deleteRole(id);
        res.status(204).json({ status: 'success', data: null });
    });
}

export default new RoleController();
