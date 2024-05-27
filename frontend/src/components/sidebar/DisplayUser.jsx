import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../features/message/messageSlice";

const DisplayUser = ({ user }) => {
  console.log("Working DisplayUser");
  console.log(user);

  // set selcted user

  const dispatch = useDispatch();

  const handleSelectUser = () => {
    console.log("user selected is the", user);
    dispatch(setSelectedUser({ selectedUser: user }));
  };
  const selectedUser = useSelector((state) => state.message.selectedUser);

  return (
    <>
      <div
        onClick={handleSelectUser}
        className={`hover:bg-[rgba(151,154,151,0.2)] ${
          selectedUser?._id == user?._id
            ? "bg-[rgba(151,154,151,0.2)] border-b border-[rgba(151,154,151,0.2)] border-t"
            : ""
        } `}
      >
        <div className="flex ml-4 pt-4 ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar  online h-14 w-14"
          >
            <div className="w-16 rounded-full">
              <img
                alt="Profile Pic"
                // src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                src={user?.profilePic}
              />
              {/* </div> */}
            </div>
          </div>
          <div className="flex-col ">
            <div className="ml-3 text-white">{user.userName}</div>
            <div className="text-sm opacity-50 ml-3"> Message </div>
          </div>

          {/*   <div className="flex w-full justify-end mr-4 "> */}
          {/*     <div className="flex-col"> */}
          {/*       <div className="ml-10 pb-2">6 909 09 Mar</div> */}
          {/**/}
          {/*       <div className="text-sm ml-14 rounded-full h-5 flex items-center justify-center bg-[rgba(62,211,103)] text-black whitespace-nowrap"> */}
          {/*         <span className="inline-block h-5 px-1 ">11</span> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   </div> */}
          <div className="flex w-full justify-end mr-4">
            <div className="flex-col">
              <div className="ml-10 pb-2">16-04-2024</div>
              <div className="flex w-full justify-end">
                <div className="text-sm ml-14 rounded-full h-5 flex bg-[rgba(62,211,103)] text-black whitespace-nowrap">
                  <span className="inline-block px-1">99+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 ">
          <hr className=" mt-2 w-[85%] h-[0.5px] bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
      </div>
    </>
  );
};

export default DisplayUser;
