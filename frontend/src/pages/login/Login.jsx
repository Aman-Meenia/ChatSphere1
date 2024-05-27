import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { loading, Login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login({ userName, password });
    setUserName("");
    setPassword("");
  };
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="form-wrapper flex flex-col items-center justify-center mx-auto rounded-lg bg-teal-50">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            {/* Login */}
            <span className="text-blue-900"> ChatSphere </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text ">Uername</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered h-10"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text ">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full input input-bordered h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className=" flex justify-around ">
              <Link
                to="/signup"
                className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
              >
                {"Don't"} have an account?
              </Link>
              <Link
                to="/sendmail"
                className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
              >
                Reset Password
              </Link>
            </div>

            <div>
              <button className="btn btn-block btn-sm mt-2">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
