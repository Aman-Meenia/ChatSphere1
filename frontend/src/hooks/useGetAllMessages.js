import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setChats } from "../features/message/messageSlice";

export const useGetAllMessages = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllMessages = async ({ user }) => {
    setLoading(true);

    await axios
      .post("/api/v1/message/get", { receiver: user })
      .then((response) => {
        console.log("Use GET ALL MESSAGES");
        // console.log(response.data);
        dispatch(setChats({ chats: response.data.allMessages }));
        // dispatch(setMessages(response.data.messageList));
      })
      .catch((error) => {
        console.log("error in getting all messages ");
        console.log(error);
        toast.error(error.response.data.message, {
          duration: 1000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { loading, getAllMessages };
};
