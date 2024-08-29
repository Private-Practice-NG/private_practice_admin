import store from '../store';
import { setAccessToken, clearAccessToken } from '../slices/authSlice';

export const getAccessToken = () => store.getState().auth.accessToken;

export const storeAccessToken = (token) => {
  store.dispatch(setAccessToken(token));
};

export const clearStoredAccessToken = () => {
  store.dispatch(clearAccessToken());
};
