const express = require("express");
const router = express.Router();

require("dotenv").config();
const User = require("../models/User");

const { login, signup } = require("../controller/auth");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
