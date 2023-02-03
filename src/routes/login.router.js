const { Router } = require("express");
const express = require("express");

const router = express.Router();

const loginController = require("../controllers/loginController");

//Get login page
router.get('/', loginController.index);

//Post Login
//router.post('/', loginController.login);

module.exports = router;
