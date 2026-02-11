import roleRepository from '../repositories/role.repository.js';
import Role from '../models/role.model.js';
import AppError from '../utils/appError.js';

class RoleService {
    async createRole(data) {
        const role = new Role(data);
        role.validate();

        return await roleRepository.create({ name: role.name });
    }

    async getAllRoles() {
        return await roleRepository.findAll();
    }

    async updateRole(id, updates) {
        if (!id || isNaN(id)) throw new AppError('Invalid role ID', 400);

        const temp = new Role({ ...updates });
        if (updates.name) temp.validate();

        return await roleRepository.update(id, updates);
    }

    async deleteRole(id) {
        if (!id || isNaN(id)) throw new AppError('Invalid role ID', 400);
        return await roleRepository.delete(id);
    }
}

export default new RoleService();
