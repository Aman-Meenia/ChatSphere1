import React from "react";
import { useAcceptRequest } from "../../hooks/useAcceptRequest";
import { useWithdrawRequest } from "../../hooks/useWithdrawRequest";
import { useRejectRequest } from "../../hooks/useRejectRequest";
import { useSendRequest } from "../../hooks/useSendRequest";

const SearchUser = ({ user }) => {
  const handleClick = (e) => {
    // Stop propagation of the click event
    e.stopPropagation();
  };
  console.log(user);

  const { loading: acceptRequestLoading, acceptRequest } = useAcceptRequest();
  const { loading: withdrawRequestLoading, withdrawRequest } =
    useWithdrawRequest();
  const { loading: rejectRequestLoading, rejectRequest } = useRejectRequest();
  const { loading: sendRequestLoading, sendRequest } = useSendRequest();

  const handleAcceptRequest = async () => {
    await acceptRequest({ userId: user._id });
  };

  const handleWithdrawRequest = async () => {
    await withdrawRequest({ receiver: user._id });
  };

  const handleRejectRequest = async () => {
    await rejectRequest({ userId: user._id });
  };

  const handleSendRequest = async () => {
    await sendRequest({ userId: user._id });
  };

  return (
    <>
      <div className="">
        <div className="flex ml-4 pt-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar  h-14 w-14"
          >
            <div className="w-16 rounded-full">
              <img
                alt="Profile Pic"
                // src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                src={user?.profilePic}
              />
            </div>
          </div>

          {/* If request is received than show accept and reject button   */}
          {user?.friendshipStatus == "Request Received" && (
            <div className="flex flex-col  justify-center w-full">
              <div className="flex ">
                <div className="ml-3 text-white">{user?.userName}</div>
                <div className="flex w-full justify-end gap-2 mr-4">
                  <button
                    className="btn btn-sm px-[5px]  bg-[rgba(39,135,84)] hover:bg-[rgba(39,135,84)] text-white"
                    onClick={handleAcceptRequest}
                  >
                    {acceptRequestLoading ? "Loading..." : "Accept "}
                  </button>
                  <button
                    onClick={handleRejectRequest}
                    className="btn btn-sm ml-2 px-[5px] bg-[rgba(42,56,60,0.6)] hover:bg-[rgba(42,56,60,0.8)] text-white "
                  >
                    {rejectRequestLoading ? "Loading..." : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* If Friend request sent */}
          {user?.friendshipStatus == "Request Sent" && (
            <div className="flex flex-col  justify-center w-full">
              <div className="flex ">
                <div className="ml-3 text-white">{user?.userName}</div>
                <div className="flex w-full justify-end gap-2 mr-4">
                  <button
                    onClick={handleWithdrawRequest}
                    className=" btn btn-sm px-[5px] bg-[rgba(0,182,255,0.6)]
                    hover:bg-[rgba(0,182,255,0.8)] text-white"
                  >
                    {withdrawRequestLoading ? "Loading..." : "Withdraw"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Request send to user  */}
          {user?.friendshipStatus == "Not friends" && (
            <div className="flex flex-col  justify-center w-full">
              <div className="flex ">
                <div className="ml-3 text-white">{user?.userName}</div>
                <div className="flex w-full justify-end gap-2 mr-4">
                  <button
                    onClick={handleSendRequest}
                    className=" btn btn-sm px-[5px] bg-[rgba(0,182,255,0.6)]
                      hover:bg-[rgba(0,182,255,0.8)] text-white"
                  >
                    {sendRequestLoading ? "Loading..." : "Send Request"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* If already Friend show message button */}
          {user?.friendshipStatus == "Friend" && (
            <div className="flex flex-col  justify-center w-full">
              <div className="flex ">
                <div className="ml-3 text-white">{user?.userName}</div>
                <div className="flex w-full justify-end gap-2 mr-4">
                  <button
                    className=" btn btn-sm px-[5px] bg-[rgba(144,238,144,0.6)]
                        hover:bg-[rgba(144,238,144,0.6)] text-white"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end  ">
          <hr className=" mt-2 w-[85%] h-[0.5px] bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
      </div>
    </>
  );
};

export default SearchUser;
