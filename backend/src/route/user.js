import { signup, login } from "../controller/auth.js";
import { verifyToken, isAdmin, isManager } from "../middleware/auth.js"
import { allEmployee, createEmployee, updateEmployee, deleteEmployee, getLoginActivity,getAllLoginActivity } from "../controller/employee.js";

import express from "express";

export const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)

// loginTracking routes 
router.get("/LoginActivity", verifyToken, getLoginActivity)
router.get("/allLoginActivity", verifyToken, isAdmin ,getAllLoginActivity)


// Admin can do all four CRUD Operation
router.post("/createEmployee", verifyToken, isAdmin ,createEmployee)
router.get("/getAllEmployee", verifyToken, isAdmin ,allEmployee)
router.post("/editEmployee", verifyToken, isAdmin , updateEmployee)
router.delete("/deleteEmployee", verifyToken, isAdmin , deleteEmployee)


export default router;