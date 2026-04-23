
import express from "express";
import passport from "passport";
import { userLogin, userRegister, userLogout, userVerifyOtp, userResendOtp, googleAuthCallback } from "../controllers/user.Controller.js";

const router = express.Router();

// Login route
router.post("/login", userLogin);

// Register route
router.post("/register", userRegister);

// Logout route
router.post("/logout", userLogout);

// OTP Verification route
router.post("/verify-otp", userVerifyOtp);

// Resend OTP route
router.post("/resend-otp", userResendOtp);

// Google Auth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { 
    session: false, 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=account_not_found` 
  }),
  googleAuthCallback
);

export default router;