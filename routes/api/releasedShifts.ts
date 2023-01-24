import express from "express"
const router = express.Router();
const releaseController = require("../../controllers/releaseController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(releaseController.getAllAvailRelease)
    .delete(releaseController.deleteRelease)
    .post(releaseController.createRelease)
    .put(releaseController.updateRelease)
router
.route("/:id")
    .get(releaseController.getAvailRelease)

module.exports = router