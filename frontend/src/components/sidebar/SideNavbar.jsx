import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { useSearchUser } from "../../hooks/useSearchUser";
import { useDispatch } from "react-redux";
import { setSearchWorking } from "../../features/search/searchUser";

const SideNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const { loading, searchUser } = useSearchUser();
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchInput) {
        dispatch(setSearchWorking({ searchWorking: true }));
        const fun = async () => {
          // console.log("searchInput " + searchInput);
          await searchUser(searchInput);
        };
        fun();
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchInput]);

  if (searchInput.length == 0) {
    dispatch(setSearchWorking({ searchWorking: false }));
  }

  return (
    <>
      <div className=" fixed top-0 bg-[rgba(30,30,30)] z-50 w-[35%] ">
        <div className="flex text-[20px] pt-3 pb-3 text-white">
          <div className="flex w-[90%] justify-center ml-8">ChatSphere</div>
          <div className="flex justify-center w-[10%]">
            <button onClick={handleLogout}>
              <IoCreateOutline
                color="rgba(125,130,140)"
                /* color="rgb(58, 165, 255)"  */ size="25px"
              />
            </button>
          </div>
          {/* <button className="btn btn-ghost btn-circle" onClick={handleLogout}> */}
          {/*   Logout */}
          {/* </button> */}
        </div>

        <div className="flex justify-center bg-[rgba(30,30,30)]">
          <label className="input input-bordered flex items-center w-[95%] !bg-[rgba(30,30,30)] ">
            <input
              type="text"
              className="grow "
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="currentColor"
              className="w-5 h-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <hr className=" mt-2  h-[0.5px] bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    </>
  );
};

export default SideNavbar;
