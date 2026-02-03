import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'FoodSync API',
        version: '1.0.0',
        description: 'API Documentation for FoodSync Restaurant Management System',
        contact: {
            name: 'API Support',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Local development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./foodsync-backend/src/routes/v1/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
