import express from "express"
import { deletePartner, getPartners } from "../controllers/partner.js";

const router = express.Router();

router.get("/getPartners" , getPartners)
router.post("/deletePartner" , deletePartner)

export default router;