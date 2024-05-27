import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken;
  // console.log(req.cookies?.accessToken);
  // console.log("Token this side");
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    // ACCESS_TOKEN_SECRET
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Access Token Expired",
    });
  }
};
