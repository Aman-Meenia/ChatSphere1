import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    email,
    password,
    userName,
    confirmPassword,
    gender,
  }) => {
    console.log(fullName, email, password, userName, confirmPassword, gender);
    if (
      validateInput({
        fullName,
        email,
        password,
        userName,
        confirmPassword,
        gender,
      }) !== true
    )
      return;
    setLoading(true);

    axios
      .post("/api/v1/user/signup", {
        fullName,
        email,
        password,
        userName,
        confirmPassword,
        gender,
      })
      .then((response) => {
        toast.success(response.data.message, {
          duration: 1000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        let errorMessage = err.response.data.message;
        console.log("eroror message " + errorMessage);
        errorMessage = errorMessage.replace(
          "User validation failed: email:",
          "",
        );

        // console.log(err.response.data.message);
        toast.error(errorMessage, {
          duration: 1000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, signup };
};

const validateInput = ({
  userName,
  fullName,
  email,
  password,
  confirmPassword,
  gender,
}) => {
  userName = userName.trim();
  fullName = fullName.trim();
  email = email.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();
  if (
    !userName ||
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("All fields are required", {
      duration: 1000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Confirm password doesn't match", {
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
