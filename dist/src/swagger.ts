import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My REST API",
      version: "1.0.0",
      description: "A REST API for managing users, posts, and comments.",
    },
    servers: [
      {
        url: "http://localhost:3000", // כתובת השרת שלך
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // נתיב לקבצים שבהם מוגדרים ה-Endpoints
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
