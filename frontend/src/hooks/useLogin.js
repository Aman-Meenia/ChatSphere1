import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Login = async ({ userName, password }) => {
    const isValid = validateInput({ userName, password });

    if (!isValid) {
      return;
    }
    setLoading(true);

    axios
      .post("/api/v1/user/login", { userName, password })

      .then((response) => {
        // toast.success("Login successful", {
        //   duration: 1000,
        //   style: {
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
        //
        const { data } = response.data;
        // console.log("data is", response);
        localStorage.setItem("user", JSON.stringify(data));

        dispatch(login(data));
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          duration: 1000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    Login,
  };
};

const validateInput = ({ userName, password }) => {
  userName = userName.trim();
  password = password.trim();
  if (!userName || !password) {
    toast.error("All fields are required", {
      duration: 1000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }
  return true;
};
