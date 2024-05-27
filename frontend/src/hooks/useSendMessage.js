import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../features/message/messageSlice";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const sendMessage = async ({ message }) => {
    setLoading(true);

    axios
      .post("/api/v1/message/send", {
        message: message,
        receiver: selectedUser._id,
      })
      .then((response) => {
        // console.log("Message send successfully");
        // console.log("Response is ");
        dispatch(addChat({ msg: response.data.msg }));
        // console.log(response.data);
      })
      .catch((error) => {
        // console.lot("Error message " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { loading, sendMessage };
};
