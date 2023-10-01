import React from 'react'
import './styles/auth.css'
import authImg from './../assets/forgotImg.png'
import logo from './../assets/logo.png'
import { TfiEmail } from "react-icons/tfi";
import { SlLock } from "react-icons/sl"
const ForgetPassword = () => {
  return (
    <div className='auth'>
    <div className="auth-img">
        <img src={authImg} alt="auth-img" />
    </div>
    <div className='auth-form-container'>
        <div className="brand-name">
          <img src={logo} alt="brand" />
          <h1>Private Practice</h1>
        </div>

        <div className="auth-welcome">
          <h2>Password Recovery</h2>
          <p>reset your password in a gify</p>
        </div>

        <form className="auth-form">
          <div className="auth-form-input auth-form-email">
            <div className='auth-form-icon'>
              <TfiEmail />
            </div>
            <input type='email' placeholder='youremail@email.com' required />
          </div>
         

          <button className='btn auth-submit-btn' type='submit'>Reset Password</button>
        </form>
    </div>
</div>
  )
}

export default ForgetPassword