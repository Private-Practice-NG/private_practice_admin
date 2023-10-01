import React from "react";
import "./styles/forgotmsg.css";
import "./styles/auth.css";
import { Link } from "react-router-dom";
const ForgotPassMsg = () => {
  return (
    <div className="forgot-msg">
      <svg
        width="159"
        height="148"
        viewBox="0 0 159 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M138.597 49.8337L41.8661 145.414L44.3213 86.9079L2.67172 45.7464L138.597 49.8337Z"
          stroke="#0E6EA1"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M132.355 52.2797L43.8381 86.8253"
          stroke="#0E6EA1"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="forgot-msg-details">
        <h1>Reset Link Sent </h1>
        <p>
          A reset link has been to your email. Click the link to create <br />a
          new password.
        </p>
      </div>
      <Link to="/" className="btn forgot-msg-btn">
        Login
      </Link>
    </div>
  );
};

export default ForgotPassMsg;
