import express from "express"
const router = express.Router();
const checkUsernameController = require("../../controllers/checkUsernameController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(checkUsernameController.checkUsername)
    

module.exports = router