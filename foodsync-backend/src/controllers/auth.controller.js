
import authService from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';

class AuthController {
    login = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        });
    });
}

export default new AuthController();
