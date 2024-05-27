import React from "react";
import Navbar from "../Navbar";
import MessageContainer from "../Message/MessageContainer";
import { TiMessages } from "react-icons/ti";

import MessageBox from "../Message/MessageBox";
import { useSelector } from "react-redux";

const ChatArea = () => {
  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  console.log("Selected user is ", selectedUser);
  console.log(selectedUser);

  return (
    <>
      {/* When user select some user to chat */}

      {/* Empty side bar  */}

      {!selectedUser ? (
        <div className="chat-area w-[65%] h-screen overflow-y-scroll ">
          <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
              <p> Welcome 👋 {user?.fullName}</p>
              <p>Select a chat to start messaging</p>
              <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-area w-[65%] h-screen overflow-y-scroll ">
          <Navbar />
          <MessageContainer />
          <MessageBox />
        </div>
      )}

      {/* <div className="chat-area w-[65%] h-screen overflow-y-scroll "> */}
      {/*   <div className="flex items-center justify-center w-full h-full"> */}
      {/*     <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2"> */}
      {/*       <p> Welcome 👋 {user?.fullName}</p> */}
      {/**/}
      {/*       <p>Select a chat to start messaging</p> */}
      {/*       <TiMessages className="text-3xl md:text-6xl text-center" /> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
    </>
  );
};

export default ChatArea;
