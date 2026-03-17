
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/appError.js';

class AuthService {
    async login(email, password) {
        // 1) Check if email and password exist
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        // 2) Check if user exists && password is correct
        const user = await userRepository.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Incorrect email or password', 401);
        }

        if (!user.active) {
            throw new AppError('User account is deactivated', 401);
        }

        // 3) If everything ok, send token to client
        const token = this.signToken(user.user_id);

        // Remove password from output
        user.password = undefined;
        // Role slug for frontend: role_id 2 = viewer, else admin (no role table required)
        user.role = user.role_id === 2 ? 'viewer' : 'admin';

        return { user, token };
    }

    signToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'secret-key-change-me', {
            expiresIn: process.env.JWT_EXPIRES_IN || '90d'
        });
    }
}

export default new AuthService();
