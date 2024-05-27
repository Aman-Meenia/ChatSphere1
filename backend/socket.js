import User from "./models/userModel.js";
import { io, sub } from "./server.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const socketConnection = async () => {
  try {
    // parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)

    io.on("connection", async (socket) => {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      // console.log("cookies are ", cookies);
      console.log("connected to socket " + socket.id);

      if (cookies.accessToken) {
        // ACCESS_TOKEN_SECRET
        const decoded = jwt.verify(
          cookies.accessToken,
          process.env.ACCESS_TOKEN_SECRET,
        );

        const user = await User.findById(decoded._id);

        console.log("Uuser is ", user?.userName);
        if (!user) {
        }
        user.socketId = socket.id;
        await user.save({ validateBeforeSave: false });
        sub.subscribe(user?.userName);
      } else {
        socket.emit("error", "User not found");
      }
    });
  } catch (error) {
    socket.emit("error", "User not found");

    // console.log(error);
  }
};

export { socketConnection };

// console.log("cookies are ", cookies);
// io.on("connection", (socket) => {
// console.log("connected to socket" + socket.id);
// try{
//  // parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)
//       // const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
//     // console.log("cookies are ", cookies);
//   socket.on("join_room", async (data) => {
//     socket.join(data);
//     console.log("User Joined Room: " + data);
//   });
//   //
//   // socket.on("message", async (data) => {
//   //   console.log(data);
//   //   await pub.publish("aman", JSON.stringify(data));
//   // });
//   sub.on("message", (channel, message) => {
//     console.log(channel);
//     console.log(message);
//
//     });
//       }catch(error){
//         socket.emit("error", error);
//       }
//   });
// });
