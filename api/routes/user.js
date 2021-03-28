const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// Routes

router.get("/users", userController.getAllUserController); // Get all data

router.get("/:id", userController.getOneUserController); // Get one data

router.post("/", userController.createUserController); // Create data

router.delete("/:id", userController.deleteUserController); // Delete data

// Exports

module.exports = router;