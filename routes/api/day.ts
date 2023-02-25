import express from "express"
const router = express.Router();
const dayController = require("../../controllers/dayController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(dayController.getAllDays)
    
    .post(dayController.createDay)
    .patch(dayController.updateDay)
router
.route("/:id")
    .get(dayController.getDay)
    .delete(dayController.deleteDay)

module.exports = router