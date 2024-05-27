import React, { useEffect } from "react";
import Navbar from "../Navbar";
import SideNavbar from "./SideNavbar";
import UserContainer from "./UserContainer";
import MessageContainer from "../Message/MessageContainer";
import SearchUsers from "../search/SearchUsers";
import { useSelector } from "react-redux";

const Sidebar = () => {
  useEffect(() => {
    console.log("WOkring ");
  }, []);

  const searchWorking = useSelector((state) => state.search.searchWorking);
  console.log("searchWorking", searchWorking);

  return (
    <>
      <div className="   w-[35%] bg-[rgba(30,30,30)] h-screen overflow-y-scroll">
        <SideNavbar />
        {searchWorking ? <SearchUsers /> : <UserContainer />}
        {/* <SideNavbar /> */}
        {/* <UserContainer /> */}
        {/* <SearchUsers /> */}
      </div>
    </>
  );
};

export default Sidebar;
