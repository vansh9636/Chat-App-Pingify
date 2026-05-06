const express = require("express");
const { sendmessage } = require("../controller/messageController");
const isAuthenticated = require("../middlewere/middlewere");
const { getMessages } = require("../controller/messageController");
const router = express.Router();
router.post("/send/:reciverId", isAuthenticated, sendmessage);
router.get("/get/:reciverId", isAuthenticated, getMessages);
module.exports = router;
