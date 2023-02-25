import express from "express"
const router = express.Router();
const dayController = require("../../controllers/dayController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(dayController.getAllDays)
    .delete(dayController.deleteDay)
    .post(dayController.createDay)
    .patch(dayController.updateDay)
router
.route("/:id")
    .get(dayController.getDay)
    

module.exports = router