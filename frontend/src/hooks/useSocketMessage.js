import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../features/message/messageSlice";

export const socketMessage = () => {
  const socket = useSelector((state) => state.message.socket);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  // console.log("Socket is useSocket Message ");
  // console.log(socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      // console.log("SOcket working");
      const handleMessageReceived = (data) => {
        if (data.sender === selectedUser._id) {
          // console.log("New message added successfully");
          dispatch(addChat({ msg: data }));
        }
      };

      // console.log("Setting up event listener for newMessageReceived");
      socket.on("newMessageReceived", handleMessageReceived);

      // Clean up the effect
      return () => {
        // console.log("Cleaning up event listener for newMessageReceived");
        socket.off("newMessageReceived");
      };
    }
  }, [socket, selectedUser, dispatch]);
};
