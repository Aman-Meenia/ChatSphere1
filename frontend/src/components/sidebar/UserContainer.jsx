import React, { useEffect } from "react";
import DisplayUsers from "./DisplayUsers";
import MessageContainer from "../Message/MessageContainer";

const UserContainer = () => {
  return (
    <>
      <div
        // className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue
        // scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mt-15"
        className="mt-[130px] "
        // className=" mt-[128.5px] h-full overflow-y-auto  "
      >
        <DisplayUsers />
      </div>
    </>
  );
};

export default UserContainer;
