import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';

import productRoutes from "../src/routes/product";
import connectDB from "./config/database";

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello, TypeScript Express!" });
});

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
