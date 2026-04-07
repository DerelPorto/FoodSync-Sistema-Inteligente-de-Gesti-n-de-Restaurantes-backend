import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const jwtSecret = () => process.env.JWT_SECRET || 'secret-key-change-me';

export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new AppError('No autorizado. Envía un token Bearer válido.', 401);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, jwtSecret());
    } catch {
        throw new AppError('Token inválido o expirado.', 401);
    }

    const user = await userRepository.findById(decoded.id);
    if (!user?.active) {
        throw new AppError('Usuario no encontrado o inactivo.', 401);
    }

    user.password = undefined;
    req.user = user;
    next();
});

export const restrictToAdmin = (req, res, next) => {
    if (req.user.role_id === 2) {
        return next(new AppError('No tienes permiso para realizar esta acción.', 403));
    }
    next();
};
