import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    console.log(req.cookies);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized , no token",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.adminId).select("--password");
    next();
    return;
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, invalid token" });
      return;
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default protect;
