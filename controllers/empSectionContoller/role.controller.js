import asyncHandler from "express-async-handler";
import Role from "../../models/empSectionModel/role.model.js";


export const createRole = asyncHandler(async (req, res) => {
  const { name, description, department, permissions } = req.body;

  if (
    !name?.trim() ||
    !department ||
    !Array.isArray(permissions) ||
    permissions.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, department and permissions are required"
    });
  }

  const newRole = await Role.create({
    name,
    description,
    department,
    permissions
  });

  return res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: newRole
  });
});

export const getAllRoles = asyncHandler(async(req,res) => {
    try {
        const roles = await Role.find().populate("department", "name")
        .populate("permissions", "name");
        return res.status(200).json({
            success: true,
            message: "Roles fetched successfully",
            data: roles
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

export const deleteRole = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const deleteRole = await Role.findByIdAndDelete(id);
        if(!deleteRole){
            return res.status(404).json({
                success: false,
                message: "Role not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Role deleted successfully"
        })    
    } catch (error) {
       error.status(500).json({
        success: false,
        message: error.message
       })  
    }
})


export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, department, permissions, status } = req.body;


  if (
    !name &&
    !description &&
    !department &&
    !permissions &&
    !status
  ) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required to update"
    });
  }

  const updateData = {};

  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (department) updateData.department = department;
  if (permissions) updateData.permissions = permissions;
  if (status) updateData.status = status;

  const updatedRole = await Role.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedRole) {
    return res.status(404).json({
      success: false,
      message: "Role not found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: updatedRole
  });
});


