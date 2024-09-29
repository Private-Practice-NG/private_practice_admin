// import React from "react";
// import './styles/forgotmsg.css';
import '../styles/auth.css';
import { Link } from 'react-router-dom';

const ForgotPassMsg = () => {
  return (
    <main className="flex flex-col mt-[150px] px-3 sm:px-5 text-center xsm:w-[500px] xsm:mx-auto">
      <div className="svg-wrapper mx-auto">
        <svg
          className="w-[90px] md:w-[150px]"
          viewBox="0 0 159 148"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M138.597 49.8337L41.8661 145.414L44.3213 86.9079L2.67172 45.7464L138.597 49.8337Z"
            stroke="#0E6EA1"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M132.355 52.2797L43.8381 86.8253"
            stroke="#0E6EA1"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="forgot-msg-details">
        <h1 className="text-2xl sm:text-3xl poppins mt-8 font-bold text-[#10ACF5]">
          Reset Link Sent{' '}
        </h1>
        <p className="text-[14px] mt-6">
          A reset link has been to your email. Click the link to create <br />a
          new password.
        </p>
      </div>
      <Link to="/log-in" className="btn forgot-msg-btn poppins mt-10">
        Login
      </Link>
    </main>
  );
};

export default ForgotPassMsg;
