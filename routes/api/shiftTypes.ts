import express from "express"
const router = express.Router();
const shiftTypeController = require("../../controllers/shiftTypeController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(shiftTypeController.getAllShiftTypes)
    
    .post(shiftTypeController.createShiftType)
    .patch(shiftTypeController.updateShiftType)
router
.route("/:id")
    .get(shiftTypeController.getShiftType)
    .delete(shiftTypeController.deleteShiftType)

module.exports = router