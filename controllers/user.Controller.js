import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import UserRequest from "../models/user.request.model.js";

const normalizeEmail = (email) => email?.trim().toLowerCase();

const userRegister = asyncHandler(async (req, res) => {
  let { name, email, phone, password } = req.body;

  email = normalizeEmail(email);

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email });
  console.log(userExists);

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  console.log("REGISTER OTP:", otpCode);

  const userRequest = await UserRequest.create({
    name,
    email,
    phone,
    password: hashedPassword,
    otp: {
      code: otpCode,
      expiresAt: otpExpires,
    },
  });

  // const user = await User.create({
  //     name,
  //     email,
  //     phone,
  //     password: hashedPassword,
  //     otp: {
  //         code: otpCode,
  //         expiresAt: otpExpires
  //     }
  // });

  try {
    await sendEmail({
      email: user.email,
      subject: "Verify your account",
      message: `OTP: ${otpCode}`,
      html: `<h2>Your OTP is ${otpCode}</h2>`,
    });
  } catch (err) {
    console.log("Email error:", err.message);
  }

  return res.status(201).json({
    success: true,
    message: "Registered successfully. OTP sent.",
  });
});

const userVerifyOtp = asyncHandler(async (req, res) => {
  let { email, otp } = req.body;

  email = normalizeEmail(email);
  otp = otp?.toString().trim();

  console.log("VERIFY INPUT:", { email, otp });

  const user = await UserRequest.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.isVerified.email) {
    return res.status(400).json({
      success: false,
      message: "Already verified",
    });
  }

  if (!user.otp?.code) {
    return res.status(400).json({
      success: false,
      message: "No OTP found",
    });
  }

  console.log("DB OTP:", user.otp);

  if (new Date() > user.otp.expiresAt) {
    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  if (user.otp.code.toString() !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  await UserRequest.updateOne(
    { _id: user._id },
    {
      $set: { "isVerified.email": true },
      $unset: { otp: "" },
    },
  );

  //   adding user to main user collection after verification
  const userRequest = await User.create({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    "isVerified.email": true,
  });

  return res.json({
    success: true,
    message: "OTP verified successfully",
  });
});

const userLogin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = normalizeEmail(email);

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (!user.isVerified.email) {
    return res.status(403).json({
      success: false,
      message: "Verify OTP first",
    });
  }

  const token = generateToken({ id: user._id }, process.env.JWT_SECRET);

  return res.json({
    success: true,
    message: "Login success",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
    token,
  });
});

const userResendOtp = asyncHandler(async (req, res) => {
  let { email } = req.body;

  email = normalizeEmail(email);

  const user = await UserRequest.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.isVerified.email) {
    return res.status(400).json({
      success: false,
      message: "Already verified",
    });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  console.log("RESEND OTP:", otpCode);

  user.otp = {
    code: otpCode,
    expiresAt: otpExpires,
  };

  await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject: "Resend OTP",
      message: `OTP: ${otpCode}`,
    });
  } catch (err) {
    console.log(err);
  }

  return res.json({
    success: true,
    message: "OTP resent",
  });
});

const userLogout = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: "Logout successful",
  });
});

const googleAuthCallback = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }

  const token = generateToken({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.redirect(
    `${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard?token=${token}`,
  );
});

export {
  userRegister,
  userVerifyOtp,
  userLogin,
  userResendOtp,
  userLogout,
  googleAuthCallback,
};
