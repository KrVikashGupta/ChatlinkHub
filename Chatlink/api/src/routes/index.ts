import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import messageRoutes from "./messageRoutes";
import chatRoutes from './chatRoutes'

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);
router.use("/chat", chatRoutes)

export default router;
