import React, { useEffect } from "react";
import DisplayUser from "./DisplayUser";
import { useGetAllFriends } from "../../hooks/useGetAllFriends";
import { useSelector } from "react-redux";

const DisplayUsers = () => {
  const { loading, getAllFriends } = useGetAllFriends();
  const friends = useSelector((state) => state.friend.friends);
  useEffect(() => {
    const fun = async () => {
      await getAllFriends();
    };
    fun();
  }, []);
  return (
    <>
      {loading && (
        <div className="text-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {friends.length > 0 &&
        friends.map((friend, index) => {
          // console.log(friend.friend);

          return <DisplayUser key={index} user={friend.friend} />;
        })}
      {/*   {seiarchUser?.map((user) => ( */}
      {/*   <SearchUser key={user?._id} user={user} /> */}
      {/* ))} */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
      {/* <DisplayUser /> */}
    </>
  );
};

export default DisplayUsers;
