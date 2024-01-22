const express = require('express')
const router = express.Router();
const queryController = require('../controllers/QueryController')

router.get('/employees-with-department', queryController.getEmployeesWithDepartment);
router.get('/total-payout-2023', queryController.getTotalPayout2023);
router.get('/top-employees-by-month', queryController.getTopEmployeesByMonth);
router.get('/employees-without-payout', queryController.getEmployeesWithoutPayout);

module.exports = router;