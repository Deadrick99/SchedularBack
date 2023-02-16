import express from "express"
const router = express.Router();
const employeeShiftController = require("../../controllers/EmployeeShiftController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(employeeShiftController.getAllEmployeeShifts)
    .delete(employeeShiftController.deleteEmployeeShift)
    .post(employeeShiftController.createEmployeeShift)
    .patch(employeeShiftController.updateEmployeeShift)
router
.route("/:id")
    .get(employeeShiftController.getEmployeeShift)

module.exports = router