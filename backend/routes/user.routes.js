import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,getUserProfile } from "../controllers/user.controller.js";
// import { getUserProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/profile", protectRoute, getUserProfile);
export default router;
