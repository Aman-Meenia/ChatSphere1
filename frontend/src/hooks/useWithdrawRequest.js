import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateSearchUsers } from "../features/search/searchUser";

export const useWithdrawRequest = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const withdrawRequest = async ({ receiver }) => {
    setLoading(true);

    await axios
      .post("/api/v1/request/withdraw", { receiver: receiver })
      .then((response) => {
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

  return { loading, withdrawRequest };
};
