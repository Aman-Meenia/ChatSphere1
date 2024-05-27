import { app, httpServer, io, sub } from "./server.js";
import ConnectDB from "./db/ConnectDB.js";
import mongoose from "mongoose";
import cors from "cors";
// import cookieParser from "cookie-parser";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.get("/api/v1/user", (req, res) => {
//   res.send("Helll Aman Meenia");
// });

// app.use(cookieParser());
app.use(cookieParser());

// <---------------------Routing ----------------------->
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import { socketConnection } from "./socket.js";
import User from "./models/userModel.js";
// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: ["https://chat-sphere1.vercel.app", "http://localhost:3001"],
    credentials: true,
    withCredentials: true,
  }),
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/request", requestRoutes);
app.use("/api/v1/friend", friendRoutes);
app.use("/api/v1/message", messageRoutes);

// <---------------------Socket.io----------------------->
socketConnection();
sub.on("message", async (channel, message) => {
  console.log("Channel name is ");
  // console.log(channel);
  console.log(message);
  const messageData = JSON.parse(message);
  // console.log(messageData.receiver);
  io.to(channel).emit("message", messageData);
  const idIs = new mongoose.Types.ObjectId(messageData.receiver);
  console.log(idIs);
  const receiverDetails = await User.findById(idIs);
  console.log(receiverDetails.socketId);

  io.to(receiverDetails.socketId).emit("newMessageReceived", messageData);
});

//  Running Server and MongoDB connection
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await ConnectDB();
    httpServer.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
