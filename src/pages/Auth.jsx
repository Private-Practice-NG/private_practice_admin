import React from 'react'
import './styles/auth.css'
import authImg from './../assets/authImg.png'
import logo from './../assets/logo.png'
import { TfiEmail } from "react-icons/tfi";
import { SlLock } from "react-icons/sl";
const Auth = () => {
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
              <h2>Welcome back</h2>
              <p>Login to start managing data...</p>
            </div>

            <form className="auth-form">
              <div className="auth-form-input auth-form-email">
                <div className='auth-form-icon'>
                  <TfiEmail />
                </div>
                <input type='email' placeholder='youremail@email.com' required />
              </div>
              <div className="auth-form-input auth-form-password">
                <div className="auth-form-icon">
                  <SlLock />
                </div>
                <input type='password' placeholder='Password' required />
              </div>
              <a href="#" >Forget Password?</a>

              <button className='btn auth-submit-btn' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Auth