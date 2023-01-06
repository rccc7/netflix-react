import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    // The login takes the state and action and modifies the user with the value of the action
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

//With a selector we can access to the state value. This is the way we can make
//the information inside the datalayer be accessible to the application
export const selectUser = state => state.user.user;

export default userSlice.reducer;
