import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

<<<<<<< HEAD
<<<<<<< HEAD
// Ensure dotenv is loaded if this file is imported directly in some context, 
// though usually it's loaded at app entry.
=======
>>>>>>> 5dd7a39 (Primer Commit)
=======
// Ensure dotenv is loaded if this file is imported directly in some context, 
// though usually it's loaded at app entry.
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
<<<<<<< HEAD
<<<<<<< HEAD
    throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
=======
    throw new Error('Faltan las credenciales de Supabase en el .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
>>>>>>> 5dd7a39 (Primer Commit)
=======
    throw new Error('Missing Supabase URL or Key');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
>>>>>>> c0ea64d (Inicializar el backend con arquitectura modular, CRUD de menú, manejo de errores y configuración de Supabase.)
