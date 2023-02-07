import express from "express"
const router = express.Router();
const userNameController = require("../../controllers/checkUsernameController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(userNameController.getAllStores)
    

module.exports = router