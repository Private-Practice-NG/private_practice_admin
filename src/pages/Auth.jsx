import React from "react";
import "./styles/auth.css";
import authImg from "./../assets/authImg.png";
import logo from "./../assets/logo.png";
import { TfiEmail } from "react-icons/tfi";
import { SlLock } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state)=> state.auth);

  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }
  },[navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate("/")
      toast.success("Login Successful")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  };
  return (
    <div className="auth auth-body">
      <div className="auth-img">
        <img src={authImg} alt="auth-img" />
      </div>
      <div className="auth-form-container">
        <div className="brand-name">
          <img src={logo} alt="brand" />
          <h1>Private Practice</h1>
        </div>

        <div className="auth-welcome">
          <h2>Welcome back</h2>
          <p>Login to start managing data...</p>
        </div>

        <form onSubmit={submitHandler} className="auth-form">
          <div className="auth-form-input auth-form-email">
            <div className="auth-form-icon">
              <TfiEmail />
            </div>
            <input
              type="email"
              placeholder="youremail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-form-input auth-form-password">
            <div className="auth-form-icon">
              <SlLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/forgot-password">Forget Password?</Link>

          <button className="btn auth-submit-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
