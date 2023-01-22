import express from "express"
const router = express.Router();
const shiftTypeController = require("../../controllers/shiftTypeController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.ShiftLead,ROLES_LIST.Manager),shiftTypeController.getAllShiftTypes)
    .delete(shiftTypeController.deleteShiftType)
    .post(shiftTypeController.createShiftType)
    .put(shiftTypeController.updateShiftType)
router
.route("/:id")
    .get(shiftTypeController.getShiftType)

module.exports = router