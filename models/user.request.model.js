import mongoose from "mongoose";

const userRequestSchema = new mongoose.Schema(
  {
    // Reference to the user making the request
    name: {
      type: String,
      required: true,
    },
    // User's email address (must be unique)
    email: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

const UserRequest = mongoose.model("UserRequest", userRequestSchema);

export default UserRequest;
