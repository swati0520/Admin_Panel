import express from "express";
import { createDepartment, deleteDepartment, getAllDepartments, updateDepartment } from "../../controllers/empSectionContoller/department.controller.js";
import { createRole, deleteRole, getAllRoles, updateRole } from "../../controllers/empSectionContoller/role.controller.js";
import { createEmployee, deleteEmployee, getAllEmp, updateEmployee } from "../../controllers/empSectionContoller/employee.controller.js";
import { createDesignation, deleteDesignation, getDesignations, updateDesignation } from "../../controllers/empSectionContoller/designation.controller.js";


const router = express.Router();

router.post("/createDepartment",createDepartment);
router.get("/getAllDepartments",getAllDepartments);
router.delete("/deleteDepartment/:id",deleteDepartment);
router.put("/updateDepartment/:id",updateDepartment);

router.post("/createRoles", createRole);
router.get("/getAllRoles", getAllRoles);
router.delete("/deleteRole/:id", deleteRole);  
router.put("/updateRole/:id", updateRole);


router.get("/getAllEmp", getAllEmp);
router.delete("/deleteEmp/:id", deleteEmployee);
router.put("/updateEmp/:id", updateEmployee);
router.post("/createEmp", createEmployee);


router.get("/getAllDesignations", getDesignations);
router.post("/createDesignation", createDesignation); 
router.delete("/deleteDesignation/:id", deleteDesignation);
router.put("/updateDesignation/:id", updateDesignation);





export default router;

