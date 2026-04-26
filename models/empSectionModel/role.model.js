import mongoose from "mongoose";


const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
   permissions: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    required: true
  }
],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

const Role = mongoose.model('Role', RoleSchema);
export default Role;