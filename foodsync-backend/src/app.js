import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import AppError from './utils/appError.js';
import globalErrorHandler from './middlewares/errorHandler.js';
import v1Router from './routes/v1/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', v1Router);

app.get('/', (req, res) => {
    res.json({ message: 'FoodSync API Backend - Online 🚀' });
});

// Handle 404 - Unknown Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;