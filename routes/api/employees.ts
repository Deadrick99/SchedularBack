import express from "express"
const router = express.Router();
const employeeController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.ShiftLead,ROLES_LIST.Manager,ROLES_LIST.Employee),employeeController.getAllEmployees)
    .delete(employeeController.deleteEmployee)
    .patch(employeeController.updateEmployee)
router
.route("/:id")
    .get(employeeController.getEmployee)

module.exports = router