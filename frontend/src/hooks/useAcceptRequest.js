import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateSearchUsers } from "../features/search/searchUser";

export const useAcceptRequest = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const acceptRequest = async ({ userId }) => {
    setLoading(true);

    await axios
      .post("/api/v1/request/accept", { sender: userId })
      .then((response) => {
        console.log(response.data);
        console.log("Accept request ");
        console.log("id ", response.data.id);
        dispatch(
          updateSearchUsers({
            id: response.data.id,
            friendshipStatus: response.data.friendshipStatus,
          }),
        );
      })
      .catch((error) => {
        console.log("error in accept request", error);
        toast.message("Request failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, acceptRequest };
};
