const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Juegos",
      version: "1.0.0",
      description: "Una API para gestionar Juegos con autenticación JWT",
    },
    servers: [{ url: "http://localhost:5000" }],
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
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
