import AppError from '../utils/appError.js';

const sendErrorDev = (err, res) => {
<<<<<<< HEAD
    res.status(err.statusCode).send(err.message);
=======
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Programming or other unknown error: don't leak details
        console.error('ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
};

export default errorHandler;
