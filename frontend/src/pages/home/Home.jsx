import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatArea from "../../components/chatarea/ChatArea";
import Loading from "../../components/Loading";

const Home = () => {
  return (
    <>
      <div className=" w-full h-screen bg-[rgb(40,40,41)] ">
        <div className="flex w-full h-full">
          <Sidebar />
          <ChatArea />
        </div>
      </div>
    </>
  );
};

export default Home;
