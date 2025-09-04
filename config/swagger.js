const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Lucas PGE",
      version: "1.0.0",
      description: "API simulada para cadastro e consulta de inscrições protestadas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "x-access-token",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, '../controllers/*.js')],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec }