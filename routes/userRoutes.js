const express = require("express");
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


//GET user|  GET
router.get("/getUser",authMiddleware, getUserController)
//Update user| 
router.put("/updateUser",authMiddleware, updateUserController)
//password update
router.post("/updatePassword",authMiddleware, updatePasswordController)
//reset password
router.put("/resetPassword",authMiddleware, resetPasswordController)
//delete profile
router.delete('/deleteUser/:id',authMiddleware, deleteProfileController)


module.exports = router;
 