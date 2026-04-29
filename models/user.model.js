import mongoose from "mongoose";

// User schema for authentication
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
    },
    // User's email address (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User's phone number
    phone: {
      type: String,
      required: false,
    },
    // Hashed password
    password: {
      type: String,
      required: false,
    },
    // Auth provider (local, google, etc.)
    provider: {
      type: String,
      default: "local",
    },
    // Profile picture URL
    profilePicture: {
      type: String,
    },
    // Google ID if registered via Google
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    // Verification status for email and phone
    isVerified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    // OTP for verification
    otp: {
      code: String,
      expiresAt: Date, // Expiry time for OTP
    },
    // Two-factor authentication settings
    twoFactor: {
      enabled: {
        type: Boolean,
        default: false,
      },
      secret: {
        type: String,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // List of refresh tokens for the user
    refreshTokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// module.exports = mongoose.model('User', userSchema);
const User = mongoose.model("User", userSchema);

export default User;
