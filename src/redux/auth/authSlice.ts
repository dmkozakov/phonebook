import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, logout, refresh, register } from './operations';
import { IUser, IUserCredentials } from 'interfaces/IUser';

export interface AuthState {
  user: IUser | IUserCredentials;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
} as AuthState;

const handleSignUpUser = (
  state: AuthState,
  action: PayloadAction<AuthState>
) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const handleLoginUser = (
  state: AuthState,
  action: PayloadAction<AuthState>
) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.error = null;
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const handleLoginUserRejected = (
  state: AuthState,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
};

const handleLogOutUser = (state: AuthState) => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const handleRefreshUserPending = (state: AuthState) => {
  state.isRefreshing = true;
};

const handleRefreshUserFulfilled = (
  state: AuthState,
  action: PayloadAction<IUser>
) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const handleRefreshUserRejected = (state: AuthState) => {
  state.isRefreshing = false;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(register.fulfilled, handleSignUpUser)
      .addCase(login.fulfilled, handleLoginUser)
      .addCase(logout.fulfilled, handleLogOutUser)
      .addCase(refresh.pending, handleRefreshUserPending)
      .addCase(refresh.fulfilled, handleRefreshUserFulfilled)
      .addCase(refresh.rejected, handleRefreshUserRejected)
      .addMatcher(isError, handleLoginUserRejected),
});

export const authReducer = authSlice.reducer;
