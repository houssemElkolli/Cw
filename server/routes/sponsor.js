import express from "express"
import { deleteSponsor, getSponsors } from "../controllers/sponsor.js";

const router = express.Router();

router.get("/getSponsors" , getSponsors)
router.post("/deleteSponsor" , deleteSponsor)

export default router;