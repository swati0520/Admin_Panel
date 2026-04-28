import asyncHandler from "express-async-handler";
import Designation from "../../models/empSectionModel/designation.model.js";


export const createDesignation = asyncHandler(async (req, res) => {
  const { title, description, department, status } = req.body;

  if (!title?.trim() || !department || !status) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required"
    });
  }

  try {
    const newDesignation = await Designation.create({
      title,
      description,
      department,
      status
    });

    return res.status(201).json({
      success: true,
      message: "Designation created successfully",
      data: newDesignation
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


export const getDesignations = asyncHandler(async (req, res) => {
 
    const designations = await Designation.find().populate("department", "name");
    return res.status(200).json({
      success: true,
      message: "Designations fetched successfully",
      data: designations
    });
});

export const deleteDesignation = asyncHandler(async (req, res) => {     
    const { id } = req.params;
    try {
        const deletedDesignation = await Designation.findByIdAndDelete(id);
        if (!deletedDesignation) {
            return res.status(404).json({
                success: false,
                message: "Designation not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Designation deleted successfully"
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export const updateDesignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, department, status } = req.body;

  if (!title?.trim() && !description && !department && !status) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required to update"
    });
  }

  try {
    const updatedDesignation = await Designation.findByIdAndUpdate(
      id,
      { title, description, department, status },
      { new: true }
    );

    if (!updatedDesignation) {
      return res.status(404).json({
        success: false,
        message: "Designation not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Designation updated successfully",
      data: updatedDesignation
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});