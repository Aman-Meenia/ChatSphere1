import React from "react";
import { useSelector } from "react-redux";

export const Message = ({ msg }) => {
  // console.log("Message is ");
  // console.log(msg);

  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  // console.log(user);

  let isLoginUser = false;
  // console.log("sender is " + msg?.sender);
  // console.log(" user is " + user?._id);
  if (msg?.sender == user?._id) {
    isLoginUser = true;
  }
  // console.log("Is login user " + isLoginUser);
  return (
    <>
      <div
        className={`chat ${isLoginUser ? "pr-3" : "pl-3"}   ${isLoginUser ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              // src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              src={isLoginUser ? user?.profilePic : selectedUser?.profilePic}
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{msg?.msg}</div>

        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      {/* <div className="chat chat-end pr-3"> */}
      {/*   <div className="chat-image avatar"> */}
      {/*     <div className="w-10 rounded-full"> */}
      {/*       <img */}
      {/*         alt="Tailwind CSS chat bubble component" */}
      {/*         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" */}
      {/*       /> */}
      {/*     </div> */}
      {/*   </div> */}
      {/*   <div className="chat-header"> */}
      {/*     Anakin */}
      {/*     <time className="text-xs opacity-50">12:46</time> */}
      {/*   </div> */}
      {/*   <div className="chat-bubble">I hate you! You were the Chosen One</div> */}
      {/*   <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      {/* </div> */}
    </>
  );
};
