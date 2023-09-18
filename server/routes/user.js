import express from "express";
import { createUser, deleteUsers } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";
import verifyToken from "../middleware/auth.js";



const router = express.Router()

//protected Routes
router.use(verifyToken)
router.get("/getusers"  , getUsers );
router.post("/createUser"  ,createUser );
router.post("/deleteUsers"  ,deleteUsers );


export default router;
