import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
<<<<<<< HEAD
import { apiReference } from '@scalar/express-api-reference';
import { swaggerSpec } from './config/swagger.js';

import AppError from './utils/appError.js';
import globalErrorHandler from './middlewares/errorHandler.js';
import v1Router from './routes/v1/index.js';
=======
>>>>>>> 5dd7a39 (Primer Commit)

import AppError from './utils/appError.js';
import globalErrorHandler from './middlewares/errorHandler.js';
import v1Router from './routes/v1/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

<<<<<<< HEAD
<<<<<<< HEAD
// Documentation
app.use(
    '/docs',
    apiReference({
        spec: {
            content: swaggerSpec,
        },
    })
);

// Routes
app.use('/api/v1', v1Router);

=======
// Ruta de prueba
>>>>>>> 5dd7a39 (Primer Commit)
=======
// Routes
app.use('/api/v1', v1Router);

>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
app.get('/', (req, res) => {
    res.json({ message: 'FoodSync API Backend - Online 🚀' });
});

<<<<<<< HEAD
<<<<<<< HEAD
// Handle 404 - Unknown Routes
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

=======
// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

>>>>>>> 5dd7a39 (Primer Commit)
=======
// Handle 404 - Unknown Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
export default app;