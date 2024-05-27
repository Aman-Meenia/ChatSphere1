import User from "../models/userModel.js";
import cookieParser from "cookie-parser";
import { generateJWT } from "../utils/generateJWT.js";
import Request from "../models/requesetModel.js";
import mongoose from "mongoose";
// <-----------------------------------------SignUp User------------------------------------>

// const options = {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none",
// };
export const signUpUser = async (req, res) => {
  try {
    const { fullName, userName, email, gender, password, confirmPassword } =
      req.body;

    if (
      !fullName ||
      !userName ||
      !email ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if username or email already exists

    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // compare password

    const isMatch = password === confirmPassword;
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    // const otherProfilePic = `https://avatar.iran.liara.run/public/other?username=${userName}`;
    let profilePic;
    if (gender === "male") {
      profilePic = boyProfilePic;
    } else {
      profilePic = girlProfilePic;
    }
    // create new user

    const newUser = await User.create({
      fullName,
      userName,
      email,
      gender,
      password,
      profilePic,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    if (err.name == "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    console.log("Error in signing up user");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// <-----------------------------Login User------------------------------->

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check user present in db or not

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // compare password

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { accessToken, refreshToken } = await generateJWT(user._id);
    console.log("Cookies set successfully");
    const options = {
      httpOnly: true,
      secure: true,
    };
    // console.log("accessToken", accessToken);
    // console.log("refreshToken", refreshToken);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login successfull",
        data: {
          _id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          profilePic: user.profilePic,
          gender: user.gender,
        },
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// <--------------------------------Logout User------------------------------->

export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    console.log("LOgout workign ");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.refreshToken = null;
    await user.save();

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logout successfull",
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//<---------------------------------Search User------------------------------->
export const searchUser = async (req, res) => {
  try {
    const { userName } = req.params;

    // console.log("username is  the ", userName);
    // console.log("UserId is ", req.user._id);
    const { id } = req.user._id;

    const userId = new mongoose.Types.ObjectId(id);

    // const searchUserList = await User.find({
    //   _id: { $ne: req.user._id },
    //   userName: { $regex: `${userName}`, $options: "i" },
    // });
    //
    const requestList = await Request.find({});
    // console.log(requestList);
    const searchUserList = await User.aggregate([
      // Match users whose username matches or contains the search term
      {
        $match: {
          _id: { $ne: req.user._id },
          userName: { $regex: `${userName}`, $options: "i" },
        },
      },
      // Lookup the Friendship collection to get friendship status
      {
        $lookup: {
          from: "friends", // Name of the Friendship collection
          let: { userId: "$_id" }, // Local field to match against
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$sender", "$$userId"] }, // Match sender
                    { $eq: ["$receiver", "$$userId"] }, // Match receiver
                  ],
                },
              },
            },
          ],
          as: "friendships", // Output array field containing matched friendships
        },
      },
      {
        $lookup: {
          from: "requests",
          let: { userIdd: "$_id" },
          pipeline: [
            {
              $match: {
                // $expr: { $eq: ["$sender", "userId"] },
                $expr: {
                  $and: [
                    { $eq: ["$sender", userId] }, // Match sender
                    { $eq: ["$receiver", "$$userIdd"] }, // Match receiver
                  ],
                },
              },
            },
          ],
          as: "requestsSend",
        },
      },
      {
        $lookup: {
          from: "requests",
          let: { userIdd: "$_id" },
          pipeline: [
            {
              $match: {
                // $expr: { $eq: ["$sender", "userId"] },
                $expr: {
                  $and: [
                    { $eq: ["$sender", "$$userIdd"] }, // Match sender
                    { $eq: ["$receiver", userId] }, // Match receiver
                  ],
                },
              },
            },
          ],
          as: "requestsReceive",
        },
      },

      // Project the final output with the friendship status
      {
        $project: {
          userName: 1, // Include username field
          profilePic: 1,
          friendshipStatus: {
            $cond: {
              if: { $gt: [{ $size: "$friendships" }, 0] },
              then: "Friend",
              else: {
                $cond: {
                  if: { $gt: [{ $size: "$requestsSend" }, 0] },
                  then: "Request Sent",
                  else: {
                    $cond: {
                      if: { $gt: [{ $size: "$requestsReceive" }, 0] },
                      then: "Request Received",
                      else: "Not friends",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);
    // const searchUserList = await User.aggregate([
    //   {
    //     $match: {
    //       _id: { $ne: req.user._id },
    //       userName: { $regex: `${userName}`, $options: "i" },
    //     },
    //
    //
    //   },
    //
    // ])

    // console.log("searchUserList is ", searchUserList);
    return res.status(200).json({
      success: true,
      searchUserList: searchUserList,
    });
  } catch (err) {
    console.log("error in searching user", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
