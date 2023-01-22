import express from "express"
const router = express.Router();
const dayController = require("../../controllers/dayController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.ShiftLead,ROLES_LIST.Manager),dayController.getAllDays)
    .delete(dayController.deleteDay)
    .post(dayController.createDay)
    .put(dayController.updateDay)
router
.route("/:id")
    .get(dayController.getDay)

module.exports = router