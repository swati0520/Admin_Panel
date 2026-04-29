import asyncHandler from "express-async-handler";
import Employee from "../../models/empSectionModel/employee.model.js";
export const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, password, department, designation, role } =
    req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !password?.trim() ||
    !department ||
    !designation
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newEmp = await Employee.create({
    ...req.body,
  });

  res.status(201).json({
    success: true,
    data: newEmp,
  });
});

export const getAllEmp = asyncHandler(async (req, res) => {
  const emp = await Employee.find({ isDeleted: { $ne: true } })
    .populate("department", "name")
    .populate("designation", "title");
  res.status(200).json(emp);
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteEmp = await Employee.findByIdAndUpdate({
    _id: id,
    isDeleted: true,
  });
  res.status(200).json(deleteEmp);
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Don't update password if it's empty
  if (!updateData.password || updateData.password.trim() === "") {
    delete updateData.password;
  }

  const updateEmp = await Employee.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  res.status(200).json(updateEmp);
});
