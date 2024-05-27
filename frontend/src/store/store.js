import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import searchSlice from "../features/search/searchUser";
import friendSlice from "../features/friend/friendSlice";
import messageSlice from "../features/message/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
    friend: friendSlice,
    message: messageSlice,
  },
});
