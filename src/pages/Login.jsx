// import React from "react";
import './styles/auth.css';
import loginPageSideImg from './../assets/img-1.png';
import logo from './../assets/logo.png';
import { TfiEmail } from 'react-icons/tfi';
import { SlLock } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

const override = {
  margin: '0 auto',
  width: '100%',
  top: '50%',
  left: '50%'
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [color, setColor] = useState('#10ACF5');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
      toast.success('Login Successful');
    } catch (error) {
      toast.error(error?.data?.message || 'Something Went Wrong');
    }
  };

  return (
    <div className="auth auth-body flex items-center justify-center">
      {isLoading && (
        <>
          <div className="spinner">
            <FadeLoader
              color={'#10ACF5'}
              loading={isLoading}
              cssOverride={override}
              size={300}
              height={50}
              width={5}
              radius={10}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
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
          onSubmit={submitHandler}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
