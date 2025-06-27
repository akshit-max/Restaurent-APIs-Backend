const express = require('express');
const { testUserController } = require('../controllers/testController');

const router = express.Router();

// Define the GET route
router.get('/test-user', testUserController);

module.exports = router;
