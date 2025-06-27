const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("../controllers/authcontroller"); // ✅ Import the controller

// Routes
// Register || POST
router.post('/register', registerController);
//Login || Post
router.post('/login',loginController)

module.exports = router;
