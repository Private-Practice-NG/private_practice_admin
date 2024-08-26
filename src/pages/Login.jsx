import { useState} from 'react';
import './styles/auth.css';
import loginPageSideImg from './../assets/img-1.png';
import logo from './../assets/logo.png';
import { TfiEmail } from 'react-icons/tfi';
import { SlLock } from 'react-icons/sl';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLoginMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';

const serverBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;


// const override = {
//   margin: '0 auto',
//   width: '100%',
//   top: '50%',
//   left: '50%'
// };


const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // const [user, setUser] = useState({})
  //  const submitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const toastId = toast.loading('logging in...');

  //     const res = await login({ email, password }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     navigate('/');
  //     toast.success('logged in successfully', {
  //       id: toastId,
  //       duration: 4000
  //       // position: 'bottom-left',

  //       // Styling
  //       // style: {
  //       //   fontSize: '14px'
  //       // }
  //     });
  //   } catch (error) {
  //     toast.error(error?.data?.message || 'Something Went Wrong');
  //   }
  // };

      // userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :null


  async function loginHandler(e) {
    e.preventDefault();

    const toastId = toast.loading('signin you in...');
    setIsLoading(true)
    
    console.log(loginForm);
    
    if (loginForm.email === '' || loginForm.password === '') {
      return toast.error('please fill in all fields', { duration: 3000 });
    }

    // async function fetchData() {
    try {
      console.log('serverBaseUrl', serverBaseUrl);


      const loggedInUser = await axios.post(
        `${serverBaseUrl}/api/admins/auth`,
        loginForm,
        {
          withCredentials: true
          // headers: {
          //   Authorization: `Bearer ${userAccessToken}`,
          //   Email: `${userEmail}`,
          // },
        }
      );

      if (
          loggedInUser
        // &&
        // loggedInUser.data.requestStatus === 'login successful'
      ) {
        // console.log('adminUser data fetched successfully');

        console.log(loggedInUser.data.response);

        // setUser(adminUser);
      toast.success('login successful.', {
        id: toastId,
        // duration: 4000,
      });
        
      localStorage.setItem('userInfo', JSON.stringify(loggedInUser.data.response));

      setIsLoading(false);
      
      navigate("/")
      }
      // dispatch(setAdmins(adminProfiles.data));
    } catch (error) {
      console.log(error?.data?.message || error.error);
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
                    email: e.target.value,
                  });
                }}
                id='email'
                required
              />
            </div>
            <div className="relative auth-form-input auth-form-password">
              <div
                className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px' }}
              >
                <SlLock />
              </div>
              <input
                className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    password: e.target.value,
                  });
                }}
                id='password'
                required
              />
            </div>
          </section>
          <Link
            className="mt-3 text-right underline text-[12px]"
            to="/forgot-password"
          >
            Forgot Password
          </Link>

          <button
            className="mt-5 btn auth-submit-btn poppins py-4"
            onClick={ loginHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
