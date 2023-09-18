import express from "express";
import { addContactForm, getContacts, deleteContact, validateEmail , getTotalNumber } from "../controllers/contact.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();


router.post("/addContactForm", addContactForm);
router.post("/validateEmail", validateEmail);

//protected Routes
router.use(verifyToken)
router.get("/getContacts", getContacts);
router.get("/getTotalNumber", getTotalNumber);
router.post("/deleteContact", deleteContact);

export default router;
