import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware";
import {
  getUserchats,
  getChatsBetweenTwousers,
} from "../controllers/chatController";

const router = express.Router();

router.get("/chat-history", verifyAccessToken, getUserchats);
router.get("/get-chats", verifyAccessToken, getChatsBetweenTwousers);

export default router;
