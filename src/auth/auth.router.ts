import express from "express";
import { registerHandler, registerValidation } from "./registerHandler";
import { loginHandler, loginValidation } from "./loginHandler";
import { logoutHandler } from "./logout";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
const router = express.Router();

router.post("/register",
    registerValidation,
    handleValidationErrors,
    registerHandler
);

// router.get("/verify/:email/:token", verifyHandler);

router.post("/login",
    loginValidation,
    handleValidationErrors,
    loginHandler);

router.get("/logout", logoutHandler);

export default router;
