const express = require('express')
const router = express.Router();
const departmentController = require("../controllers/DepartmentController")

router.get('/all_departments', departmentController.getAllDepartments);
router.post('/departments', departmentController.createDepartment);
router.put('/departments/:id', departmentController.updateDepartment);

module.exports = router;