import { RootState } from 'redux/store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user.name;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectError = (state: RootState) => state.auth.error;
