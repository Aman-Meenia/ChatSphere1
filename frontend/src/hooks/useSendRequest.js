import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateSearchUsers } from "../features/search/searchUser";

export const useSendRequest = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const sendRequest = async ({ userId }) => {
    setLoading(true);

    await axios
      .post("/api/v1/request/send", { receiver: userId })
      .then((response) => {
        console.log(response.data);
        dispatch(
          updateSearchUsers({
            id: response.data.id,
            friendshipStatus: response.data.friendshipStatus,
          }),
        );
      })
      .catch((error) => {
        toast.error(error.response.message, {
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

  return { loading, sendRequest };
};
