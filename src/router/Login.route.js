import { Router } from "express";
import * as LoginController from "../controllers/Login.controller.js";
import auth from "../middleware/auth.middleware.js";
import redirect from "../middleware/redirect.middleware.js";
const router = Router();

router.post("/create", LoginController.CreateUser);
router.post("/login", LoginController.LoginUser);
router.get("/", auth, redirect);

export default router;
