const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

// Routes


router.get("/", messageController.viewMessage); // Get message data


// Exports

module.exports = router;