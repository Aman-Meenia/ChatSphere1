import User from "../models/userModel.js";

export const generateJWT = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log("Error while generating JWT");
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while generating JWT",
    });
  }
};
