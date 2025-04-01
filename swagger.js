const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Juegos",
      version: "1.0.0",
      description: "Una API para gestionar Juegos con autenticación JWT",
    },
    servers: [{ url: "https://mi-api-juegos2.onrender.com" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Games: {
          type: "object",
          properties: {
            _id: { type: "string", example: "60d5ec49d4a3e30f8c3f5b48" },
            title: { type: "string", example: "The Last of Us" },
            description: { type: "string", example: "Juego de acción y aventura" },
            completed: { type: "boolean", example: false },
            user: { type: "string", example: "60d5ec49d4a3e30f8c3f5b47" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["title", "user"],
        },
        // Error: {  // Agregamos el esquema Error
        //   type: "object",
        //   properties: {
        //     message: { type: "string", example: "Datos de entrada inválidos" },
        //     code: { type: "integer", example: 400 },
        //   },
        // },
        // Error1: {  // Agregamos el esquema Error
        //   type: "object",
        //   properties: {
        //     message: { type: "string", example: "No autorizado" },
        //     code: { type: "integer", example: 401 },
        //   },
        // },
        // Error2: {  // Agregamos el esquema Error
        //   type: "object",
        //   properties: {
        //     message: { type: "string", example: "Error del servidor" },
        //     code: { type: "integer", example: 500 },
        //   },
        // },
        
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
