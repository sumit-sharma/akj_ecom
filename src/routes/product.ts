import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import Product, { IProduct, TProduct } from "../models/product";
import { title } from "process";
import { StatusCodes } from "http-status-codes";

const router = Router();

let products: IProduct[] = [];

/**
 * @swagger
 *
 * paths:
 *  /api/products:
 *   get:
 *     summary: Retrieve a list of prodycts
 *     parameters:
 *         - name: product_category
 *           in: query
 *           required: false
 *           explode: true
 *           schema:
 *             type: string
 *             enum:
 *               - Online Puja
 *               - Gems
 *               - Kundali
 *               - Yantra
 *               - Kundali Matching 
 
 *     responses:
 *       200:
 *         description: A list of product
 *   post:
 *    summary: store a product
 *    operationId: addProduct
 *    requestBody:
 *       content:
 *           application/json:
 *             schema:  
 *                $ref: "#/components/schemas/Products"
 * 
 * components:
 *    schemas:
 *      Products:
 *          type: object
 *          properties:
 *                title: 
 *                    type: string
 *                    example: product 
 *                description:
 *                    type: string
 *                    example: some description
 *                price:
 *                    type: number
 *                    example: 50
 *                product_category:
 *                    type: string
 *                    example: gems
 *                    enum:
 *                     - onlinePuja
 *                     - gems
 *                     - kundali
 *                     - yantra
 *                     - kundaliMatching 
 *                  
 *                    
 *  

 */

router.get("/", async (req: Request, res: Response) => {
  // product_category: req.params.product_category
  let query = await req.query;
  const products = await Product.find(query);
  res.json(products);
});

const productRouteSchema = [
  check("title", "Please enter a title").exists(),
  check("description", "Please enter a description").exists(),
  check("price", "Please enter a valid price").exists().isNumeric(),
];

router.post("/", productRouteSchema, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { title, description, price, product_category, product_images } =
    await req.body;
  const productField: TProduct = {
    title: title,
    description: description,
    price: price,
    product_category: product_category,
    product_images: product_images,
  };
  let product = new Product(productField);
  await product.save();
  res.json(product);
});

router.put(
  "/:productId",
  productRouteSchema,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    let product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(product);
  }
);

export default router;
