import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateSearchUsers } from "../features/search/searchUser";

export const useRejectRequest = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const rejectRequest = async ({ userId }) => {
    setLoading(true);

    await axios
      .post("/api/v1/request/reject", { sender: userId })
      .then((response) => {
        console.log("request rejected");
        console.log(response.data);
        dispatch(
          updateSearchUsers({
            id: response.data.id,
            friendshipStatus: response.data.friendshipStatus,
          }),
        );
      })
      .catch((error) => {
        console.log(error.response);
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

  return { loading, rejectRequest };
};
