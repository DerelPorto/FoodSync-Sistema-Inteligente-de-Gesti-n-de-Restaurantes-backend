import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'FoodSync API Backend - Online 🚀' });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;