import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController";
import { verifyAccessToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send-message", verifyAccessToken, sendMessage);
router.get("/get-messages", verifyAccessToken, getMessages);
export default router;
