const express = require("express");



const authMiddleware = require("../middleware/authMiddleware");
const { CreateRestaurentController, getallRestaurentController, getrestaurentbyidController, deletedRestaurentController } = require("../controllers/restaurentController");
const router = express.Router();


//routes || POST
router.post("/create",authMiddleware,CreateRestaurentController)
//get all restaurents || GET
router.get("/getALL", getallRestaurentController)
// get restaurent by id || GET
router.get('/get/:id',getrestaurentbyidController)
// delete restaurent
router.delete('/delete/:id',deletedRestaurentController)




module.exports = router;
 