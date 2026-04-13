<<<<<<< HEAD
<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();

import app from './foodsync-backend/src/app.js';
import whatsappService from './foodsync-backend/src/services/whatsapp.service.js';

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        // Inicializar el cliente de WhatsApp para generar el QR
        whatsappService.initialize();
    });
} catch (error) {
    console.error('Error starting server:', error);
}
=======
import app from './src/app.js';
=======
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
import dotenv from 'dotenv';
dotenv.config();

import app from './foodsync-backend/src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
>>>>>>> 5dd7a39 (Primer Commit)
