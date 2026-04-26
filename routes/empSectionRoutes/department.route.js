import express from "express";
import { createDepartment, deleteDepartment, getAllDepartments, updateDepartment } from "../../controllers/empSectionContoller/department.controller.js";
import { createRole, deleteRole, getAllRoles, updateRole } from "../../controllers/empSectionContoller/role.controller.js";


const router = express.Router();

router.post("/createDepartment",createDepartment);
router.get("/getAllDepartments",getAllDepartments);
router.delete("/deleteDepartment/id",deleteDepartment);
router.put("/updateDepartment/id",updateDepartment);



router.post("/createRoles", createRole);
router.get("/getAllRoles", getAllRoles);
router.delete("/deleteRole/id", deleteRole);  
router.put("/updateRole/id", updateRole);





export default router;

