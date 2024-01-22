const express = require("express")
const router = express.Router();
const employeeController = require("../controllers/EmployeesController")

router.post('/employees', employeeController.createEmployee);
router.put('/employees/:email', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router