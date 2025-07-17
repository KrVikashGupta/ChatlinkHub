import express from "express";
import {
  refreshToken,
  userLogin,
  userRegistration,
  logout,
} from "../controllers/authController";
import { isUsernameUnique } from "../controllers/userController";

const router = express.Router();

router.get("/unique-username", isUsernameUnique);
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
