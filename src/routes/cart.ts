import { Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import Cart, { TCart } from "../models/cart";
import { check } from "express-validator";

const router = Router();


router.get("/", auth, async (req: Request, res: Response) => {
    // product_category: req.params.product_category
    try {
        let query = await req.query;
        const carts = await Cart.find(query);
        res.status(200).json(carts);
      
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal server error" })
    }
  });


  const productRouteSchema = [
    check("title", "Please enter a title").exists(),
    check("description", "Please enter a description").exists(),
    check("price", "Please enter a valid price").exists().isNumeric(),
  ];
  

  router.post("/", [auth], async (req: Request, res: Response) => {
    // product_category: req.params.product_category
    try {
        const { user_id, product_uid, variety, price, quantity, additional_remark } = await req.body;
      const cartField: TCart = {
        user_id: res.locals.user_id,
        product_uid: product_uid,
        variety: variety,
        price: price,
        quantity: quantity,
        additional_remark: additional_remark,
      };
      let cart = new Cart(cartField);
      await cart.save();
      res.status(201).json(cart);
       
      
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal server error" })
    }
  });




export default router;