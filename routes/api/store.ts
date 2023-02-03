import express from "express"
const router = express.Router();
const storeController = require("../../controllers/storeController");
const ROLES_LIST = require("../../Config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(storeController.getStores)
    

module.exports = router