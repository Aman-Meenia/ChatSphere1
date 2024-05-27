import React, { useEffect } from "react";
import SearchUser from "./SearchUser";
import { useSelector } from "react-redux";

const SearchUsers = () => {
  // const searchusers = useSelector((state) => state.search_Userr.searchusers);
  const user = useSelector((state) => state.auth.user);

  const searchUser = useSelector((state) => state.search.searchusers);

  return (
    <>
      <div className="mt-[130px]">
        {searchUser.length > 0 &&
          searchUser?.map((user) => <SearchUser key={user?._id} user={user} />)}
      </div>
    </>
  );
};

export default SearchUsers;
