import express from "express";
import {signup,login,logout,update,checkAuth} from "../controllers/auth.controller.js" 
import { routecheck } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",signup );
router.post("/login", login);
router.post("/logout", logout);
router.put('/update-image',routecheck,update)
router.get("/check",routecheck,checkAuth);


export default router;
