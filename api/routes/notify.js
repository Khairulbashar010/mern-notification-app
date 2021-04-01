const express = require("express");
const router = express.Router();

const notifyController = require("../controllers/notify");

// Routes

router.post("/notify", notifyController.notifyUserController); // Notify user


// Exports

module.exports = router;