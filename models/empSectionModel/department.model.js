import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false

    },
    code: {
        type: String,
        required: true,
        unique: true

    },
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: false
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"]
    },


}, { timestamps: true })


const Department = mongoose.model('Department', departmentSchema);

export default Department;