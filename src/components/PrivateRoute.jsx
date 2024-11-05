import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const token = getAccessToken();

  useEffect(() => {
    if (!userInfo || !token) {
      navigate('/log-in', { replace: true });
    }
  }, [userInfo, token, navigate]); // Run useEffect when userInfo or token changes

  // If authenticated, render the nested routes
  return userInfo && token ? <Outlet /> : null;
};

export default PrivateRoute;
