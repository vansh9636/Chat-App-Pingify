const express = require("express");
const { sendmessage } = require("../controller/messageController");
const isAuthenticated = require("../middlewere/middlewere");
const { getMessages } = require("../controller/messageController");
const router = express.Router();
router.post("/send/:receiverId", isAuthenticated, sendmessage);
router.get("/get/:receiverId", isAuthenticated, getMessages);
module.exports = router;
