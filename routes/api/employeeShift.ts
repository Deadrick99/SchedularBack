import express from "express"
const router = express.Router();
const employeeShiftController = require("../../controllers/employeeShiftController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.ShiftLead,ROLES_LIST.Manager),employeeShiftController.getAllEmployeeShifts)
    .delete(employeeShiftController.deleteEmployeeShift)
    .post(employeeShiftController.createEmployeeShift)
    .put(employeeShiftController.updateEmployeeShift)
router
.route("/:id")
    .get(employeeShiftController.getEmployeeShift)

module.exports = router