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
    updateItem,
    addItem,
} from "../controllers/carousel.js";
import multer from "multer";

const router = express.Router();

/* File Storage*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });


router.get("/getCarouselItem", getCarouselItem);
router.get("/streamingVideos/:videoName", streamingVideos);
router.get("/getTotalNumber", getTotalNumber);

//protected Routes
router.use(verifyToken)
router.get("/getCarouselItems", getCarouselItems);
router.post("/revertItemsOrder", revertItemsOrder);
router.post("/swapCarouselItems", swapCarouselItems);
router.post("/addItem", [upload.single("picture")], addItem);
router.post("/updateItem",[upload.single("picture")], updateItem);
router.post("/deleteCarouselItems", deleteCarouselItems);

export default router;
