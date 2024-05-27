import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setFriends } from "../features/friend/friendSlice";

export const useGetAllFriends = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllFriends = async () => {
    setLoading(true);
    await axios
      .get("/api/v1/friend/get")
      .then((response) => {
        console.log("Use GET ALL FRIENDS");
        // console.log(response);
        console.log(response.data.friendList);
        dispatch(setFriends(response.data.friendList));
      })
      .catch((error) => {
        console.log("error in getting all friends ");
        console.log(error);
        toast.message(error.response.data.message, {
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
  return { loading, getAllFriends };
};
