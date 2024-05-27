import mongoose from "mongoose";
import Friend from "../models/friendModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { pub, sub } from "../server.js";
import Chat from "../models/chatModel.js";
// <----------------------------------Send Message------------------------------------->

export const sendMessage = async (req, res) => {
  try {
    let { receiver, message } = req.body;
    const sender = req.user._id;
    message = message?.trim();

    if (!receiver || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    receiver = new mongoose.Types.ObjectId(receiver);

    // check if friend
    const checkFriendStatus = await Friend.aggregate([
      {
        $match: {
          $or: [
            { sender: sender, receiver: receiver },
            { receiver: sender, sender: receiver },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          sender: 1,
          receiver: 1,
        },
      },
    ]);

    // console.log("checkFriendStatus", checkFriendStatus);
    if (!checkFriendStatus.length) {
      return res.status(400).json({
        success: false,
        message: "You are not friends",
      });
    }

    // check if the chat is already created

    const checkChat = await Chat.aggregate([
      {
        $match: {
          $and: [
            { participants: { $size: 2 } },
            {
              participants: {
                $all: [sender, receiver],
              },
            },
          ],
        },
      },
    ]);

    // If chat alreay exist the update the last message

    const newMessage = new Message({
      sender,
      receiver,
      msg: message,
    });

    const receiverUser = await User.findById(receiver);

    console.log("receiverUser.userName, " + receiverUser.userName);
    await pub.publish(
      "alice",
      JSON.stringify({
        sender: sender,
        receiver: receiver,
        msg: message,
      }),
    );

    await newMessage.save();
    console.log("checkChat", checkChat);
    if (checkChat.length) {
      const chatIs = await Chat.findById(checkChat[0]._id);
      chatIs.lastMessage = newMessage._id;
      await chatIs.save({ validateBeforeSave: false });
    } else {
      // If chatting for the first time

      const newChat = new Chat({
        chatName: "one-to-one",
        participants: [sender, receiver],
        lastMessage: newMessage._id,
      });

      await newChat.save();
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      msg: newMessage,
    });
  } catch (error) {
    console.log("Error is " + error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

//<----------------------------Get All Messages ----------------------------------->

export const getAllMessages = async (req, res) => {
  try {
    const sender = req.user._id;
    let { receiver } = req.body;
    console.log("Message controller");
    console.log("receiver is ", receiver);
    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    receiver = new mongoose.Types.ObjectId(receiver);

    const allMessages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
          ],
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $project: {
          sender: 1,
          receiver: 1,
          msg: 1,
          createdAt: 1,
        },
      },
    ]);

    // console.log("allMessages", allMessages);

    return res.status(200).json({
      success: true,
      message: "All messages fetched successfully",
      allMessages: allMessages,
    });
  } catch (error) {
    console.log("error is the " + error);
    return res.status(500).json({
      success: false,
      message: "Internal server error ..",
    });
  }
};
