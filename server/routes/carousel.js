import express from "express"
import { deleteCarouselItems, getCarouselItems,swapCarouselItems } from "../controllers/carousel.js";

const router = express.Router();

router.get("/getCarouselItems" , getCarouselItems)
router.post("/swapCarouselItems" , swapCarouselItems)
router.post("/deleteCarouselItems" , deleteCarouselItems)

export default router;