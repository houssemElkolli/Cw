import express from "express";
import { deleteSponsor, getSponsors } from "../controllers/sponsor.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/getSponsors", getSponsors);
//protected Routes
router.use(verifyToken);
router.post("/deleteSponsor", deleteSponsor);

export default router;
