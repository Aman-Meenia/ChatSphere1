import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectedUser: null,
  socket: null,
};

const messageSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      console.log("message slice");
      console.log(action.payload.selectedUser);
      state.selectedUser = action.payload.selectedUser;
    },
    setChats: (state, action) => {
      // console.log("setting chats");
      // console.log(action.payload.chats);
      state.chats = action.payload.chats;
    },
    addChat: (state, action) => {
      console.log("adding chat" + action.payload.msg);
      state.chats.push(action.payload.msg);
    },
    setSocket: (state, action) => {
      console.log("setting socket ");
      console.log(action.payload.socket);
      state.socket = action.payload.socket;
    },
  },
});

export const { setSocket, setChats, addChat, setSelectedUser } =
  messageSlice.actions;

export default messageSlice.reducer;
