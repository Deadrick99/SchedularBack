import express from "express"
const router = express.Router();
const requestOffController = require("../../controllers/requestOffController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(requestOffController.getAllRequestOffs)
    .delete(requestOffController.deleteRequestOff)
    .post(requestOffController.createRequestOff)
    .put(requestOffController.updateRequestOff)
router
.route("/:id")
    .get(requestOffController.getRequest)

module.exports = router