// import React from 'react'
import '../styles/auth.css';
// import './styles/auth.css';
import authImg from '../../assets/forgotImg.png';
import logo from '../../assets/logo.png';
import { TfiEmail } from 'react-icons/tfi';
// import { SlLock } from "react-icons/sl"

const ForgetPassword = () => {
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

        <form className="xsm:w-[500px] xsm:mx-auto flex flex-col mt-6 auth-form">
          <div className="auth-form-input auth-form-email relative">
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
              required
            />
          </div>

          <button
            className="btn auth-submit-btn poppins mt-8 py-4"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
