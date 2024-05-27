import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useSignup } from "../../hooks/useSignup";
const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
    // setInput({
    //   fullName: "",
    //   email: "",
    //   password: "",
    //   userName: "",
    //   confirmPassword: "",
    //   gender: "",
    // });
  };

  return (
    <div className="p-4 h-screen flex items-center justify-center w-full">
      <div className="form-wrapper flex flex-col items-center justify-center mx-auto rounded-lg bg-teal-50">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            <span className="text-blue-900"> ChatSphere</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2 ">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter email"
                className="w-full input input-bordered h-10"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter fullName"
                className="w-full input input-bordered  h-10"
                value={input.fullName}
                onChange={(e) =>
                  setInput({ ...input, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2 ">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered h-10"
                value={input.userName}
                onChange={(e) =>
                  setInput({ ...input, userName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10"
                value={input.confirmPassword}
                onChange={(e) =>
                  setInput({ ...input, confirmPassword: e.target.value })
                }
              />
            </div>
            {/* check box */}
            <div className="flex">
              <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                  <span className="label-text">Male</span>
                  <input
                    type="checkbox"
                    className="checkbox border-slate-900"
                    checked={input.gender === "male"}
                    onChange={(e) => setInput({ ...input, gender: "male" })}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className={`label gap-2 cursor-pointer `}>
                  <span className="label-text">Female</span>
                  <input
                    type="checkbox"
                    className="checkbox border-slate-900"
                    checked={input.gender === "female"}
                    onChange={(e) => setInput({ ...input, gender: "female" })}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className={`label gap-2 cursor-pointer `}>
                  <span className="label-text">Other</span>
                  <input
                    type="checkbox"
                    className="checkbox border-slate-900"
                    checked={input.gender === "other"}
                    onChange={(e) => setInput({ ...input, gender: "other" })}
                  />
                </label>
              </div>
            </div>
            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>
            <div>
              <button className="btn btn-block btn-sm mt-2 border border-slate-700">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
