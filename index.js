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
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
>>>>>>> 5dd7a39 (Primer Commit)
