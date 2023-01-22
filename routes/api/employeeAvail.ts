import express from "express"
const router = express.Router();
const employeeAvailController = require("../../controllers/employeeAvailController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.ShiftLead,ROLES_LIST.Manager),employeeAvailController.getAllEmployeeAvail)
    .delete(employeeAvailController.deleteEmployeeAvail)
    .post(employeeAvailController.createEmployeeAvail)
    .put(employeeAvailController.updateEmployeeAvail)
router
.route("/:id")
    .get(employeeAvailController.getEmployeeAvail)

module.exports = router