import User from "../models/userModel.js";
import Friend from "../models/friendModel.js";
import mongoose from "mongoose";

//<-------------------------------get Friends ----------------------------------->
export const getFriends = async (req, res) => {
  try {
    // console.log("req.User is ", req.user);
    const { id: userId } = req.user;
    console.log("UserId is ", userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const friend = await Friend.find({ sender: userId });
    console.log("Userid ", userId);
    const friendList = await Friend.aggregate([
      {
        $match: {
          $or: [{ sender: user._id }, { receiver: user._id }],
        },
      },
      {
        $project: {
          _id: 1,
          sender: 1,
          receiver: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver",
        },
      },
      {
        $project: {
          _id: 1,
          friend: {
            $cond: {
              if: {
                // $eq: [{  $arrayElemAt: ["$receiver._id", 0] }, userId]
                $eq: [
                  { $toString: { $arrayElemAt: ["$receiver._id", 0] } },
                  { $toString: userId },
                ],
              },
              then: {
                userName: { $arrayElemAt: ["$sender.userName", 0] },

                profilePic: { $arrayElemAt: ["$sender.profilePic", 0] },
                _id: { $arrayElemAt: ["$sender._id", 0] },
              },
              else: {
                userName: { $arrayElemAt: ["$receiver.userName", 0] },
                profilePic: { $arrayElemAt: ["$receiver.profilePic", 0] },
                _id: { $arrayElemAt: ["$receiver._id", 0] },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "chats",
          let: {
            senderId: { $arrayElemAt: ["$sender._id", 0] },
            receiverId: { $arrayElemAt: ["$receiver._id", 0] },
          },
          pipeline: [
            {
              $match: {
                $and: [
                  { participants: { $size: 2 } },
                  {
                    participants: {
                      $all: ["$$senderId", "$$receiverId"],
                    },
                  },
                ],
              },
            },
          ],
          as: "lastMessage",
        },
      },
    ]);
    // console.log("friendList is ", friendList);

    // friendList.map((friend, index) => {
    // const sender = userId,
    //   receiverId = friend.friend._id;
    // console.log(userId);
    // console.log(receiverId);
    // });
    return res.status(200).json({
      success: true,
      friendList,
    });
  } catch (err) {
    console.log("Error while getting friends", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
