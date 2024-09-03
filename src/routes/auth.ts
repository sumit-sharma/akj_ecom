import { Request, Response, Router } from "express";
import { connect } from "mongoose";
import { AppDataSource } from "../config/data-source";
import { Astrologer } from "../entities/Astrologer";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, async (req: Request, res: Response) => {
    // product_category: req.params.product_category
    try {
      const astroRepository = AppDataSource.getRepository(Astrologer);
      const astrologers =  await astroRepository.find();
      // console.log("astrologers: ", astrologers);
      console.log("req: ", res.locals.user_id);
      res.json("astrologers");
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal server error" })
    }
  });
  

  

  export default router;
