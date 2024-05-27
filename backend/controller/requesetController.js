import Request from "../models/requesetModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Friend from "../models/friendModel.js";
// <---------------------------Send Request ------------------------>

export const sendRequest = async (req, res) => {
  try {
    let { receiver } = req.body;
    receiver = receiver.trim();

    if (!receiver) {
      return res.status(400).json({
        success: false,
        message: "Receiver id is required",
      });
    }

    const sender = req.user._id;

    // validate the mongo id

    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check user exists
    const userExists = await User.findById(receiver);

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }

    // if receiver is same as sender
    const receiverUserObj = new mongoose.Types.ObjectId(receiver);
    if (sender.equals(receiverUserObj)) {
      return res.status(400).json({
        success: false,
        message: "Cannot send request to yourself",
      });
    }

    // check if already friend

    let alreadyFriends = await Friend.findOne({ sender, receiver });

    if (alreadyFriends) {
      return res.status(400).json({
        status: false,
        message: "Already friends",
      });
    }
    alreadyFriends = await Friend.findOne({
      receiver: sender,
      sender: receiver,
    });
    if (alreadyFriends) {
      return res.status(400).json({
        status: false,
        message: "Already friends",
      });
    }

    // check if request already sent or not

    const request = await Request.findOne({ sender, receiver });
    if (request) {
      return res.status(400).json({
        success: false,
        message: "Request already sent",
      });
    }

    // check if request is already received

    const requestReceived = await Request.findOne({ sender, receiver });
    if (requestReceived) {
      return res.status(400).json({
        success: false,
        message: "Request already received",
      });
    }

    const newRequest = await Request.create({
      sender,
      receiver,
    });

    return res.status(200).json({
      success: true,
      message: "Request sent successfully",
      id: receiver,
      friendshipStatus: "Request Sent",
    });
  } catch (err) {
    console.log("Error in request reject api");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// <---------------------------Accept Request ------------------------>

export const acceptRequest = async (req, res) => {
  try {
    let { sender } = req.body;
    sender = sender.trim();
    const receiver = req.user._id;
    // if sender id not present
    if (!sender) {
      return res.status(400).json({
        success: false,
        message: "Sender id is required",
      });
    }

    // check if sender id is a valid mongodb id

    if (!mongoose.Types.ObjectId.isValid(sender)) {
      return res.status(400).json({
        success: false,
        message: "Sender id is not valid",
      });
    }

    // check if request received

    const requestRec = await Request.findOne({ sender, receiver });

    if (!requestRec) {
      return res.status(400).json({
        status: 400,
        message: "No request received",
      });
    }

    // Accept the request
    // Push in the friend model No need to check if already friend ,checked while sending friend request

    const newFriend = await Friend.create({
      sender,
      receiver,
    });

    const requestDelete = await Request.findOneAndDelete({ sender, receiver });
    return res.status(200).json({
      success: true,
      message: "Request accept",
      id: sender,
      friendshipStatus: "Friend",
    });
  } catch (err) {
    console.log("Error in accept request api");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//<---------------------------Reject Request ------------------------>

export const rejectRequest = async (req, res) => {
  try {
    console.log("reject function called");
    let { sender } = req.body;
    sender = sender.trim();
    const receiver = req.user._id;

    // check empty

    if (!sender) {
      return res.status(400).json({
        success: false,
        message: "Sender id is required",
      });
    }

    // check valid mongo Id

    if (!mongoose.Types.ObjectId.isValid(sender)) {
      return res.status(400).json({
        success: false,
        message: "Sender id is not valid",
      });
    }

    // check if request received

    const requestRec = await Request.findOne({ sender, receiver });

    if (!requestRec) {
      return res.status(400).json({
        status: 400,
        message: "No request received",
      });
    }

    // if request present remove it

    const requestDelete = await Request.findOneAndDelete({ sender, receiver });

    return res.status(200).json({
      success: true,
      message: "Request cancel successfully",
      id: sender,
      friendshipStatus: "Not friends",
    });
  } catch (err) {
    console.log("Error in reject request api ");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// <------------------------------Get all requests Received ------------------------->

export const getAllRequestsReceived = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const requestList = await Request.find({ receiver: userId });

    return res.status(200).json({
      success: true,
      requestList: requestList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// <------------------------------Get all requests sent ------------------------->

export const getAllRequestSent = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // console.log;

    const requestList = await Request.find({ sender: userId });

    return res.status(200).json({
      success: true,
      requestList: requestList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//<--------------------------- withdraw Request ------------------------>

export const withdrawRequest = async (req, res) => {
  try {
    const { receiver } = req.body;
    const sender = req.user._id;

    console.log("receiver is ", receiver);
    if (!receiver) {
      return res.status(400).json({
        success: false,
        message: "Receiver id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      return res.status(400).json({
        success: false,
        message: "Receiver id is not valid",
      });
    }

    const userExists = await User.findById(receiver);

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }

    const requestDelete = await Request.findOneAndDelete({ sender, receiver });

    if (!requestDelete) {
      return res.status(400).json({
        success: false,
        message: "Request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request withdrawn successfully",
      id: receiver,
      friendshipStatus: "Not friends",
    });
  } catch (error) {
    console.log("Error in withdraw request api" + err);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};
