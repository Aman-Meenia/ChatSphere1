import { Navigate, Route, Router, Routes } from "react-router";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { io } from "socket.io-client";
import { setSocket } from "./features/message/messageSlice";

function App() {
  const dispath = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("https://chatsphere1-o8ny.onrender.com", {
      withCredentials: true,
    });
    dispatch(
      setSocket({
        socket: socket,
      }),
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      localStorage.getItem("user") &&
        dispath(login(JSON.parse(localStorage.getItem("user"))));
    }
    setLoading(false);
  }, [user]);

  // console.log(user);
  // console.log("path is" + window.location.pathname);

  return (
    <>
      <Routes>
        {/* {console.log("loading is" + loading + " user " + user)} */}
        {user == null && !loading && <Route path="/" element={<Login />} />}

        {loading ? <Route path="/signup" element={<Signup />} /> : null}
        {user && <Route path="/" element={<Home />} />}

        {!user && loading && <Route path="/" element={<Loading />} />}

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {/* {console.log("Welcome to ChatSphere")} */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
