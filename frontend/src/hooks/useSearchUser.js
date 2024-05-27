import { useState } from "react";
import axios from "axios";
import { setSearchUsers } from "../features/search/searchUser";
import { useDispatch } from "react-redux";

export const useSearchUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const searchUser = async (searchInput) => {
    setLoading(true);
    console.log("userName" + searchInput);
    await axios
      .get(`/api/v1/user/search/${searchInput}`)
      .then((response) => {
        dispatch(setSearchUsers(response.data.searchUserList));
      })
      .catch((error) => {
        // console.log("error is", error);
        //
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, searchUser };
};
