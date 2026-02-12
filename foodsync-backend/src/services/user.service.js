import bcrypt from 'bcrypt';
import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/appError.js';

class UserService {
    async createUser(data) {
        // Validate required fields
        if (!data.email || !data.password || !data.name) {
            throw new AppError('Name, email and password are required', 400);
        }

        // Check if email already exists
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already in use', 400);
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(data.password, 12);
        data.password = hashedPassword;

        // Default to active true if not specified
        if (data.active === undefined) {
            data.active = true;
        }

        // Default role_id if not specified (assuming 1 is a default role or similar, or just let DB handle it if nullable/default exists)
        // For now, we expect role_id or let it be null/DB default.

        return await userRepository.createUser(data);
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        return await userRepository.findById(id);
    }

    async updateUser(id, updates) {
        // Prevent updating password directly here if we want a separate route, or handle hashing if included
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 12);
        }

        return await userRepository.update(id, updates);
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

export default new UserService();
