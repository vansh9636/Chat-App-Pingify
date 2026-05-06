const express = require("express");
// const router=express.Router();
const router = express.Router();
const userController = require("../controller/userController");
const isAuthenticated = require("../middlewere/middlewere");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", isAuthenticated, userController.logout);
router.get("/getallusers", isAuthenticated, userController.getallusers);
module.exports = router; 