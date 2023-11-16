import React from "react";
import "./styles/pagecont.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import profile from "./../assets/user-settings-icon.png";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { MdLocalHospital } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { removeDashboard } from "../slices/dashboardSlice";
const PageContainer = () => {
  const [active, setActive] = useState("Home");
  const { nav } = useSelector((state) => state.users);

  const handleNav = (event, { nav, to }) => {
    setActive(nav);
    navigate(to);
  };
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(removeDashboard());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-cont">
      <div className="vertical-nav">
        <div className="vertical-nav-brand">
          <img src={logo} alt="brand" />
          <h1>Private Practice</h1>
        </div>
        <div className="vertical-nav-links">
          <div className="vertical-nav-links-top">
            <div
              onClick={(event) => handleNav(event, { nav: "Home", to: "/" })}
              className={nav == "Home" ? "nav-link active" : "nav-link"}
            >
              <AiFillHome /> Home
            </div>
            <div
              onClick={(event) =>
                handleNav(event, { nav: "Admin", to: "/admins" })
              }
              className={nav == "Admin" ? "nav-link active" : "nav-link"}
            >
              <BiSolidUser /> Admin
            </div>
            <div
              onClick={(event) =>
                handleNav(event, {
                  nav: "Hospital Enroll",
                  to: "/hospital-enroll",
                })
              }
              className={
                nav == "Hospital Enroll" ? "nav-link active" : "nav-link"
              }
            >
              <MdLocalHospital /> Hospital Enroll
            </div>
            <div
              onClick={(event) =>
                handleNav(event, { nav: "Specialist", to: "/specialists" })
              }
              className={
                nav == "Specialist" ? "nav-link active" : "nav-link"
              }
            >
              <GrUserWorker /> Specialist
            </div>
            <div
              onClick={(event) =>
                handleNav(event, { nav: "Hospital", to: "/hospitals" })
              }
              className={nav == "Hospital" ? "nav-link active" : "nav-link"}
            >
              <FaHospitalAlt /> Hospital
            </div>
          </div>
          <div
            onClick={logoutHandler}
            className={nav == "Log Out" ? "nav-link active" : "nav-link"}
          >
            <MdCancel /> Log Out
          </div>
        </div>
      </div>
      <div className="page-cont-2">
        <div className="top-hori-nav">
          <div className="top-hori-nav-pro">
            <img src={profile} alt="profile-image" />
            <div className="top-hori-nav-pro-details">
              <h3>{`${userInfo?.name}`}</h3>
              <p>Admin</p>
            </div>
          </div>
          <div className="top-hori-nav-pro-noti">
            <IoIosNotificationsOutline />
            <p>3</p>
          </div>
        </div>
        <div className="page-cont-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
