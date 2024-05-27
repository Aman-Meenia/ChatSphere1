import { createSlice } from "@reduxjs/toolkit";
import SearchUser from "../../components/search/SearchUser";

const initialState = {
  searchusers: [],
  searchWorking: false,
};

const searchSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {
    setSearchWorking: (state, action) => {
      state.searchWorking = action.payload.searchWorking;
    },
    setSearchUsers: (state, action) => {
      state.searchusers = action.payload;
    },
    updateSearchUsers: (state, action) => {
      state.searchusers = state.searchusers.map((user) => {
        if (user._id === action.payload.id) {
          // console.log(action.payload.friendshipStatus);
          return {
            ...user,
            friendshipStatus: action.payload.friendshipStatus,
          };
        }

        return user;
      });
    },
  },
});

export const { setSearchUsers, updateSearchUsers, setSearchWorking } =
  searchSlice.actions;

export default searchSlice.reducer;
