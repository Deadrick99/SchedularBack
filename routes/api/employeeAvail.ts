import express from "express"
const router = express.Router();
const employeeAvailController = require("../../controllers/employeeAvailController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(employeeAvailController.getAllEmployeeAvail)
    .delete(employeeAvailController.deleteEmployeeAvail)
    .post(employeeAvailController.createEmployeeAvail)
    .put(employeeAvailController.updateEmployeeAvail)
router
.route("/:id")
    .get(employeeAvailController.getEmployeeAvail)

module.exports = router