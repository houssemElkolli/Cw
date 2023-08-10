import express from "express";
import { addContactForm, getContacts , deleteContact } from "../controllers/contact.js";

const router = express.Router();

router.post("/addContactForm", addContactForm);
router.get("/getContacts", getContacts);
router.post("/deleteContact", deleteContact);

export default router;
