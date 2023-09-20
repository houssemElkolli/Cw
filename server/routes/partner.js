import express from "express";
import {
    addPartner,
    deletePartner,
    getPartners,
    updatePartner,
} from "../controllers/partner.js";
import verifyToken from "../middleware/auth.js";
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

router.get("/getPartners", getPartners);
//protected Routes
router.use(verifyToken);

router.post("/addItem", [upload.single("picture")], addPartner);
router.post("/updatePartner", [upload.single("picture")], updatePartner);
router.post("/deletePartner", deletePartner);

export default router;
