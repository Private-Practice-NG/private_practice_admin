import store from '../store';
import { setAccessToken, clearAccessToken } from '../slices/authSlice';

export const getAccessToken = () => store.getState().auth.accessToken;

export const storeAccessToken = (token) => {
  console.log('Storing token: ', token);
  store.dispatch(setAccessToken(token));
};

export const clearStoredAccessToken = () => {
  store.dispatch(clearAccessToken());
};

export const storeUserInfo = (userInfo) => {
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    console.error('Error storing user info:', error);
  }
};

export const getUserInfo = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo;
  } catch (error) {
    console.error('Error parsing user info:', error);
    return null;
  }
};

export const clearStoredUserInfo = () => {
  try {
    // Clear userInfo from localStorage
    localStorage.removeItem('userInfo');
    console.log('User info cleared');
  } catch (error) {
    console.error('Error clearing user info:', error);
  }
};

// import store from '../store';
// import { setAccessToken, clearAccessToken, setUserInfo, clearUserInfo } from '../slices/authSlice';

// export const getAccessToken = () => store.getState().auth.accessToken;

// export const storeAccessToken = (token) => {
//   console.log('Storing token:', token);
//   store.dispatch(setAccessToken(token));
// };

// export const clearStoredAccessToken = () => {
//   store.dispatch(clearAccessToken());
// };

// export const getUserInfo = () => store.getState().auth.userInfo;

// export const storeUserInfo = (userInfo) => {
//   console.log('Storing user info:', userInfo);
//   store.dispatch(setUserInfo(userInfo));
// };
