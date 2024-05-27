import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageDate from "./MessageDate";
import { useGetAllMessages } from "../../hooks/useGetAllMessages";
import { useSelector } from "react-redux";
import { Message } from "./Message";
import { socketMessage } from "../../hooks/useSocketMessage";

const MessageContainer = () => {
  const { loading, getAllMessages } = useGetAllMessages();

  const selectedUser = useSelector((state) => state.message.selectedUser);
  // console.log("Slected user is the  " + selectedUser);
  socketMessage();
  const messages = useSelector((state) => state.message.chats);

  useEffect(() => {
    console.log("selectedUser is ", selectedUser);
    getAllMessages({ user: selectedUser?._id });
  }, [selectedUser]);

  // console.log("Messages are ", messages.length);

  return (
    <>
      <div
        // className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue
        // scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        // className=" !overflow-scroll"
        className=" mt-[64px] h-full overflow-y-auto  mb-[64px]"
      >
        {messages?.map((msg) => {
          // console.log(msg);
          return (
            <>
              <Message msg={msg} />
            </>
          );
        })}
        {/* <MessageDate /> */}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <MessageDate /> */}
        {/**/}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <MessageDate /> */}
        {/**/}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <MessageDate /> */}
        {/**/}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/**/}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <MessageDate /> */}
        {/**/}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <MessageDate /> */}
        {/**/}
        {/* <Messages /> */}
        {/* <Messages /> */}
        {/* <Messages /> */}
      </div>
    </>
  );
};

export default MessageContainer;
