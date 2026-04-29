import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    designation: { type: mongoose.Schema.Types.ObjectId, ref: "Designation" },
    role: {
      type: String,
      enum: ["Admin", "HR", "Employee"],
      default: "Employee",
    },
    joiningDate: { type: Date },
    salary: { type: Number, default: 0, min: 0 },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      default: "Full-time",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Terminated"],
      default: "Active",
    },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    address: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: "" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    otpExpiry: { type: Date },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
