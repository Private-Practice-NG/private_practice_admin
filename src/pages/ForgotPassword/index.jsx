import '../styles/auth.css';
import authImg from '../../assets/forgotImg.png';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAccessToken, getUserInfo } from '../../utils/tokenUtils';
import { showModal } from '../../slices/modalSlice';

const ForgetPassword = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const toastId = toast.loading('Sending reset request...');
      const accessToken = getAccessToken();
      const userInfo = getUserInfo();

      if (!accessToken || !adminId) {
        dispatch(
          showModal({
            title: 'Authentication Error',
            message: 'Access token or admin ID is missing. Please log in again.'
          })
        );
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        `http://localhost:3001/api/v1/admin/reset-admin-password/?id=${adminId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            email: userInfo.email,
            'Content-Type': 'application/json'
          }
        }
      );
      const resetPasswordMessage = response.data.responseMessage;
      setMessage(resetPasswordMessage);
      toast.success(resetPasswordMessage, { id: toastId });
      navigate('/forgot-password-message', {
        state: { message: resetPasswordMessage }
      });
    } catch (error) {
      console.error('Error resetting password: ', error);
      const errorMessage =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth auth-body">
      <div className="hidden lg:block auth-img">
        <img src={authImg} alt="auth-img" />
      </div>
      <div className="auth-form-container min-h-screen flex flex-col py-[150px] w-full px-3 sm:px-5 lg:pt-0">
        <div className="flex flex-col gap-6 items-center brand-name">
          <img src={logo} alt="brand" className="w-[50px]" />
          <h1 className="text-blue-500 text-3xl sm:text-4xl poppins font-bold">
            Private Practice
          </h1>
        </div>
        <div className="mt-6 auth-welcome text-center">
          <h2 className="text-base font-[500]">Password Recovery</h2>
          <p className="text-[12px] mt-3 uppercase">
            Reset your password in a jiffy
          </p>
        </div>

        <form
          className="xsm:w-[500px] xsm:mx-auto flex flex-col mt-6 auth-form"
          onSubmit={handleSubmit}
        >
          <button
            className="btn auth-submit-btn poppins mt-8 py-4"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
