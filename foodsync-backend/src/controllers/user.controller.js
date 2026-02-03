import userService from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.js';

class UserController {
    createUser = catchAsync(async (req, res, next) => {
        const newUser = await userService.createUser(req.body);

        // Remove password from output
        if (newUser.password) newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    });

    getAllUsers = catchAsync(async (req, res, next) => {
        const users = await userService.getAllUsers();

        // Remove passwords from output
        const safeUsers = users.map(user => {
            const { password, ...rest } = user;
            return rest;
        });

        res.status(200).json({
            status: 'success',
            results: safeUsers.length,
            data: {
                users: safeUsers
            }
        });
    });

    getUser = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (user && user.password) user.password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    });

    updateUser = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);

        if (updatedUser.password) updatedUser.password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    });

    deleteUser = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await userService.deleteUser(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new UserController();
