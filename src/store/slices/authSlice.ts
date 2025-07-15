import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  email: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;