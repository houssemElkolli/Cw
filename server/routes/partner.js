import express from "express"
import { deletePartner, getPartners } from "../controllers/partner.js";
import verifyToken from "../middleware/auth.js";


const router = express.Router();


router.get("/getPartners" , getPartners)
//protected Routes
router.use(verifyToken)
router.post("/deletePartner" , deletePartner)

export default router;