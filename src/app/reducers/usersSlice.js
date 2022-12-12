import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, getUser, getUsers } from "../actions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    user: {},
    theme: "dark",
    loading: false,
  },
  reducers: {
    // Set theme dark or light
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
  extraReducers: {
    // Get all user
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    // Get user
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    // Add user
    [addUser.fulfilled]: (state, action) => {
      state.allUsers = [[action.payload], ...state.allUsers];
    },
    // Delete user
    [deleteUser.fulfilled]: (state, action) => {
      const userId = action.payload;
      state.allUsers = state.allUsers.filter((user) => user.id !== userId);
    },
    // Loading
  },
});

// Reducer
const usersReducer = usersSlice.reducer;

export const usersSelector = (state) => state.usersReducer.allUsers;
export const userSelector = (state) => state.usersReducer.user;
export const themeSelector = (state) => state.usersReducer.theme;
export const loadingSelector = (state) => state.usersReducer.loading;

// Action export

// eslint-disable-next-line no-empty-pattern
export const { setTheme } = usersSlice.actions;

// Export Reducer

export default usersReducer;
