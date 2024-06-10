const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer", "");

   
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "token is not present ",
      });
    }

   
    try {
   
      const payload = jwt.verify(token, process.env.JWT_SECRET);
    

      req.user = payload;
    
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "something went wrong while verifying",
    });
  }
};
