import express from "express"
import { checkAuth } from "../controllers/auth.controller.js";
import { getMessage, getUser, sendMessage } from "../controllers/message.controller.js";
import { routecheck } from "../middleware/auth.middleware.js";
const router =express.Router();
router.get("/users",routecheck,getUser);
router.get("/:id",routecheck,getMessage);
router.post("/send/:id",routecheck,sendMessage)
export default router