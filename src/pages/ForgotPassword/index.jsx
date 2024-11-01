import authImg from '../../assets/forgotImg.png';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAccessToken } from '../../utils/tokenUtils';
import { showModal } from '../../slices/modalSlice';
import { TfiEmail } from 'react-icons/tfi';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const toastId = toast.loading('Sending reset request...');
      const accessToken = getAccessToken();
      // const userInfo = getUserInfo();

      if (!forgotPasswordForm.email) {
        dispatch(
          showModal({
            title: 'Authentication Error',
            message: 'User email is missing. Please provide a valid email.'
          })
        );
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        `http://localhost:3001/api/v1/admin/reset-admin-password/?email=${forgotPasswordForm.email}`,
        {
          withCredentials: true,
          headers: {
            /* header data not actually necessary for the backend */
            Authorization: `Bearer ${accessToken}`,
            email: forgotPasswordForm.email,
            'Content-Type': 'application/json'
          }
        }
      );

      if (
        response &&
        response.data.responseMessage.startsWith(
          'admin user password reset successfully'
        )
      ) {
        const resetPasswordMessage = response.data.responseMessage;
        setMessage(resetPasswordMessage);
        toast.success(resetPasswordMessage, { id: toastId });
        navigate('/password-reset-message');
      }
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
    <div className="flex items-center h-screen w-screen mx-auto overflow-hidden">
      <div className="hidden lg:block h-screen">
        <img src={authImg} className="w-full h-full" alt="auth-img" />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center py-[150px] w-full px-3 sm:px-5 lg:pt-0">
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
          <section className="flex flex-col gap-8">
            <div className="relative auth-form-input auth-form-email">
              <div
                className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px' }}
              >
                <TfiEmail />
              </div>
              <input
                className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                type="email"
                placeholder="youremail@email.com"
                value={forgotPasswordForm.email}
                onChange={(e) => {
                  setForgotPasswordForm({
                    ...forgotPasswordForm,
                    email: e.target.value
                  });
                }}
                id="email"
                required
              />
            </div>
          </section>

          <button
            className="btn auth-submit-btn poppins mt-8 py-4"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
