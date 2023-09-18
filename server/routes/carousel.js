import express from "express";
import verifyToken from "../middleware/auth.js";
import {
    deleteCarouselItems,
    getCarouselItems,
    getCarouselItem,
    swapCarouselItems,
    getTotalNumber,
    streamingVideos,
    revertItemsOrder,
} from "../controllers/carousel.js";

const router = express.Router();

router.get("/getCarouselItem", getCarouselItem);
router.get("/streamingVideos/:videoName", streamingVideos);
router.get("/getTotalNumber", getTotalNumber);

//protected Routes
router.use(verifyToken)
router.get("/getCarouselItems", getCarouselItems);
router.post("/revertItemsOrder", revertItemsOrder);
router.post("/swapCarouselItems", swapCarouselItems);
router.post("/deleteCarouselItems", deleteCarouselItems);

export default router;
