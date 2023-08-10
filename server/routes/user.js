import express from "express";
import { createUser, deleteUsers } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";


const router = express.Router()

router.get("/getusers"  , getUsers );
router.post("/createuser"  ,createUser );
router.post("/deleteUsers"  ,deleteUsers );


export default router;
