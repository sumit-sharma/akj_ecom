import express, { Request, Response } from "express";
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
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
