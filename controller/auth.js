const bcrypt = require("bcrypt");
const userdata = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// signup route handler
exports.signup = async (req, res) => {
  try {
    // get data
    const { firstName, lastName, mobile, email, password } = req.body;
    // check if user exist or not
    const existuser = await userdata.findOne({ email });

    if (existuser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    if (!firstName || !lastName || !mobile || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the Details",
      });
    }
    // secure password
    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in Hashing",
      });
    }
    const user = await userdata.create({
      firstName,
      lastName,
      mobile,
      email,
      password: hashpassword,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered , please try later",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // data fetch
    const { email, password } = req.body;

    // validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "please fill all the detail carefully",
      });
    }

    // check for registered user
    let user = await userdata.findOne({ email });
    // if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };
    // verify password and generate a jwt token
    if (await bcrypt.compare(password, user.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      user.token = token;
      user.password = null;

      res.cookie("token", token).status(200).json({
        success: true,
        token,
        user,
        message: "user logged succesfully",
      });
    } else {
      return res.status(403).json({
        sucess: false,
        message: "password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};
