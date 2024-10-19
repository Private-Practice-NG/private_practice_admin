import { useState } from 'react';
import loginPageSideImg from './../assets/img-1.png';
import logo from './../assets/logo.png';
import { TfiEmail } from 'react-icons/tfi';
import { SlLock } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import { storeAccessToken, storeUserInfo } from '../utils/tokenUtils';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  async function loginHandler(e) {
    e.preventDefault();

    const toastId = toast.loading('logging you in...');
    setIsLoading(true);

    console.log(loginForm);

    if (loginForm.email === '' || loginForm.password === '') {
      return toast.error('please fill in all fields', { duration: 3000 });
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/admin/admin-log-in`,
        loginForm,
        {
          withCredentials: true
        }
      );
      console.log('Server response:', response.data);
      const accessToken = response.data.response?.accessToken;
      const {
        _id: userId,
        email: userEmail,
        profileImage,
        fullName
      } = response.data.response.user;

      if (accessToken) {
        storeAccessToken(accessToken);

        const userInfo = {
          userId,
          email: userEmail,
          profileImageData: profileImage,
          userName: fullName
        };
        storeUserInfo(userInfo);

        console.log(userInfo);
        toast.success('Login successful.', { id: toastId });

        setIsLoading(false);
        console.log('Navigating to home...');
        navigate('/');
      } else {
        throw new Error('Failed to obtain access token');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.', {
        id: toastId
      });
      setIsLoading(false);
    }
  }

  // const [color, setColor] = useState('#10ACF5');

  // const dispatch = useDispatch();

  // const [login, { isLoading }] = useLoginMutation();

  // const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [navigate, userInfo]);

  return (
    <div className="auth auth-body flex items-center justify-center">
      {isLoading && (
        <div className="spinner flex justify-center items-center w-[100%] min-h-screen bg-[#ffffff79]">
          <FadeLoader
            color={'#10ACF5'}
            loading={isLoading}
            // cssOverride={override}
            // size={300}
            height={40}
            width={2}
            radius={10}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className="hidden lg:block login-page-aside-img-wrapper">
        <img src={loginPageSideImg} alt="auth-img" className="lg:h-screen" />
      </div>
      <div className="min-h-screen flex flex-col py-[150px] w-full px-3 sm:px-5 lg:pt-0 auth-form-container">
        <div className="flex flex-col gap-6 items-center brand-name">
          <img src={logo} alt="brand" className="w-[50px]" />
          <h1 className="text-blue-500 text-3xl sm:text-4xl poppins font-bold">
            Private Practice
          </h1>
        </div>
        <div className="mt-6 auth-welcome text-center">
          <h2 className="text-base font-[500]">Welcome back</h2>
          <p className="text-[12px] mt-3 uppercase">
            Login to start managing data...
          </p>
        </div>

        <form
          // onSubmit={submitHandler}
          className="xsm:w-[500px] xsm:mx-auto flex flex-col mt-6 auth-form"
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
                value={loginForm.email}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    email: e.target.value
                  });
                }}
                id="email"
                required
              />
            </div>
            <div className="relative auth-form-input mb-[10px]">
              <div
                className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px' }}
              >
                <SlLock />
              </div>
              <input
                className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    password: e.target.value
                  });
                }}
                id="password"
                required
              />
              <HiOutlineEye
                className={`${showPassword ? 'hidden' : 'inline-block'} text-[20px] cursor-pointer absolute top-[15px] right-4`}
                onClick={toggleShowPassword}
              />
              <HiOutlineEyeSlash
                className={`${showPassword ? 'inline-block' : 'hidden'} text-[20px] cursor-pointer absolute top-[15px] right-4`}
                onClick={toggleShowPassword}
              />
            </div>
          </section>
          <Link to={`/forgot-password`} className="text-right">
            Forgot Password
          </Link>
          <button
            className="mt-5 btn auth-submit-btn poppins py-4"
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
