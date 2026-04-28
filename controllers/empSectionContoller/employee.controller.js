import asyncHandler from "express-async-handler";
import Employee from "../../models/empSectionModel/employee.model.js";
export const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, password, department, designation, role } = req.body;

  // ✅ Validation yaha hona chahiye
  if (
    !name?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !password?.trim() ||
    !department ||
    !designation ||
    !role
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const newEmp = await Employee.create({
    name,
    email,
    phone,
    password,
    department,
    designation,
    role
  });

  res.status(201).json({
    success: true,
    data: newEmp
  });
});


export const getAllEmp = asyncHandler(async (req, res) => {
    const emp = await Employee.find().populate("department", "name").populate("designation", "name");
    res.status(200).json(emp);
})

export const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteEmp = await Employee.findByIdAndDelete(id);
    res.status(200).json(deleteEmp);
})

export const updateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, department, designation, role } = req.body;
    const updateEmp = await Employee.findByIdAndUpdate(id, { name, email, phone, password, department, designation, role }, { new: true });
    res.status(200).json(updateEmp);
})



