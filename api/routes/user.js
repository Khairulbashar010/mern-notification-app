const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// Routes

router.get("/users", userController.getAllUserController); // Get user all data

router.get("/users/:id", userController.getOneUserController); // Get one user data

router.post("/", userController.createUserController); // Create user

router.post("/send", userController.notifyUserController); // Notify user


// Exports

module.exports = router;