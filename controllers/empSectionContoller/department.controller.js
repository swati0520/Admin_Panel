import Department from "../../models/empSectionModel/department.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const createDepartment = asyncHandler(async (req, res) => {

  const { name, description, code, status, location, hod } = req.body;

  if (!name?.trim() || !code?.trim() || !status || !location?.trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  // ✅ base object banao
  const departmentData = {
    name,
    description,
    code,
    status,
    location
  };

  // ✅ sirf valid hod add karo
  if (hod && hod.trim() !== "" && mongoose.Types.ObjectId.isValid(hod)) {
    departmentData.hod = hod;
  }

  const newDepartment = await Department.create(departmentData);

  return res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: newDepartment
  });

});

export const getAllDepartments = asyncHandler(async(req,res) => {
    try {
        const departments = await Department.find().populate("hod", "name email");
        return res.status(200).json({
            success: true,
            message: "Departments fetch successfully",
            data: departments
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export const deleteDepartment = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const deleteDepartment = await Department.findByIdAndDelete(id);
        if(!deleteDepartment){
            return res.status(404).json({
                success:false,
                message:"Department not found"

            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

export const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, code, status, location, hod } = req.body;

  if (
  !name &&
  !description &&
  !code &&
  !status &&
  !location &&
  !hod
) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required to update"
    });
  }

  const updatedDepartment = await Department.findByIdAndUpdate(
    id,
    { name, description, code, status, location, hod },
    { new: true, runValidators: true }
  );

  if (!updatedDepartment) {
    return res.status(404).json({
      success: false,
      message: "Department not found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Department updated successfully",
    data: updatedDepartment
  });
});

