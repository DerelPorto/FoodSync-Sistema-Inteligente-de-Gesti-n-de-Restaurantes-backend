# 🍔 FoodSync - Documentación Técnica y Guía de Inicio

## 1. Resumen del Proyecto
Estamos construyendo el backend de **FoodSync**, un sistema de gestión para restaurantes.
- **Tecnologías**: Node.js, Express (ES Modules), Supabase (PostgreSQL).
- **Arquitectura**: Modular por Capas (Controller -> Service -> Repository).

## 2. Estado Actual (Hasta el momento)
Hemos establecido los cimientos del backend y completado el primer módulo funcional.

### ✅ Lo que ya está construido:
1.  **Configuración Base**:
    - Servidor Express con `cors`, `morgan` y manejo de JSON.
    - Soporte para **ES Modules** (`import/export`) en todo el proyecto.
    - Conexión segura a **Supabase** centralizada en `src/config/supabase.js`.
2.  **Manejo de Errores Profesional**:
    - Middleware Global de Errores (`src/middlewares/errorHandler.js`).
    - Clase `AppError` para errores personalizados.
    - Wrapper `catchAsync` para evitar `try-catch` repetitivos en controladores.
3.  **Módulo de Menú y Recetas (Completo)**:
    - **Repository**: Consultas a tablas `menu_items` y `recipes`.
    - **Service**: Lógica transaccional para crear un platillo y asignar sus ingredientes (receta) en un solo paso.
    - **Controller & Routes**: Endpoints REST (`POST /menu`, `GET /menu`, `PATCH /menu/:id`, `DELETE /menu/:id`).

## 3. Arquitectura del Flujo de Datos
Cada petición HTTP sigue este camino estricto para mantener el código ordenado:

1.  **Route** (`src/routes/`): Define la URL (ej: `/api/v1/menu`) y llama al controlador.
2.  **Controller** (`src/controllers/`): Recibe `req` y `res`. Extrae datos, llama al servicio y responde al cliente. **No tiene lógica de negocio**.
3.  **Service** (`src/services/`): **El cerebro**. Valida reglas de negocio (ej: "No puedes vender si no hay stock"). Llama al repositorio.
4.  **Repository** (`src/repositories/`): **La mano**. Solo habla con Supabase. Hace `insert`, `select`, `update`. No sabe de lógica.

## 4. Guía para Empezar a Implementar (Siguientes Pasos)

### Paso 0: Configuración Inicial
Asegúrate de tener el archivo `.env` en la raíz con tus credenciales de Supabase:
```env
SUPABASE_URL=tu_url_aqui
SUPABASE_ANON_KEY=tu_key_aqui
PORT=3000
```

### Cómo crear un Nuevo Módulo (Ej: Inventario)
Sigue este orden para implementar nueva funcionalidad:

1.  **Base de Datos**:
    - Crea la tabla en Supabase (o usa el script SQL generado anteriormente).
2.  **Repository (`src/repositories/inventory.repository.js`)**:
    - Crea la clase `InventoryRepository`.
    - Añade métodos CRUD básicos (`create`, `findAll`, `updateStock`).
    - *Tip*: Copia la estructura de `menu.repository.js`.
3.  **Service (`src/services/inventory.service.js`)**:
    - Crea metodos que usen el repositorio.
    - Aquí pondrías lógica como "Validar que la cantidad no sea negativa".
4.  **Controller (`src/controllers/inventory.controller.js`)**:
    - Usa `catchAsync`.
    - Llama al servicio y retorna JSON estandarizado.
5.  **Rutas (`src/routes/v1/inventory.routes.js`)**:
    - Define los endpoints y conecta con `inventory.controller`.
6.  **Registro (`src/routes/v1/index.js`)**:
    - Importa las nuevas rutas y úsalas: `router.use('/inventory', inventoryRoutes)`.

## 5. Próximas Tareas Sugeridas
1.  **Probar el Módulo de Menú**: Usar Postman para crear un platillo con ingredientes.
2.  **Implementar Inventario**: Necesitamos poder crear ingredientes antes de asignarlos a recetas.
3.  **Implementar Órdenes**: El puente donde se descuenta el inventario al vender.
