import express from "express";
import { deleteSponsor, getSponsors } from "../controllers/sponsor.js";
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

router.get("/getSponsors", getSponsors);
//protected Routes
router.use(verifyToken);
router.post(
    "/sponsors/addItem",
    [upload.single("picture"), verifyToken],
    addSponsor
);
router.post(
    "/sponsors/updateSponsor",
    [upload.single("picture"), verifyToken],
    updateSponsor
);
router.post("/deleteSponsor", deleteSponsor);

export default router;
