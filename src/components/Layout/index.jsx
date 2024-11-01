// import React from 'react';
import { useState } from 'react';
// import '../styles/pagecont.css';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
// import toast from 'react-hot-toast';
// import mockAvatar from '../../assets/img-2.png';
import { HiHome } from 'react-icons/hi2';
import { HiUsers } from 'react-icons/hi2';
import { HiHomeModern } from 'react-icons/hi2';
import { HiUserGroup } from 'react-icons/hi2';
import { HiSquaresPlus } from 'react-icons/hi2';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiBriefcase } from 'react-icons/hi2';
import { HiArrowLeftCircle } from 'react-icons/hi2';
// import { Outlet } from 'react-router-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserInfo,
  clearStoredAccessToken,
  clearStoredUserInfo,
  getAccessToken
} from '../../utils/tokenUtils';
import { showModal } from '../../slices/modalSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [closeMobileNav, setCloseMobileNav] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);
  const { nav } = useSelector((state) => state.users);
  const userInfo = getUserInfo();
  // console.log('userInfo', userInfo);
  const hideMobileNav = () => {
    setCloseMobileNav(true);
  };

  const showMobileNav = () => {
    setCloseMobileNav(false);
  };

  const handleNav = (event, { to }) => {
    navigate(to);
    hideMobileNav();
  };

  const logoutHandler = async () => {
    try {
      const token = getAccessToken();
      const userInfo = getUserInfo();
      const userEmail = userInfo?.email;

      const bodyData = {
        email: userEmail
      };

      if (!token || !userEmail) {
        dispatch(
          showModal({
            title: 'Authentication Error',
            message:
              'Access token or user email is missing. Please log in again.'
          })
        );
        // setIsLoading(false);
        return;
      }

      await axios.post('http://localhost:3001/api/v1/admin/log-out', bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Email: userEmail
        }
      });

      console.log('Logout successful, clearing tokens...');

      clearStoredAccessToken();
      clearStoredUserInfo();

      navigate('/log-in');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      dispatch(
        showModal({
          title: 'Error',
          message: errorMessage
        })
      );
      // setIsLoading(false);
    }
  };

  const confirmLogout = () => {
    dispatch(
      showModal({
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?',
        onConfirm: logoutHandler,
        onCancel: () => {
          console.log('Logout canceled');
        }
      })
    );
  };

  return (
    <>
      <div
        className={`${closeMobileNav ? 'hidden' : 'block'} overlay text-white bg-[rgba(0,0,0,0.5)] transition-colors duration-750 ease-in fixed top-0 left-0 right-0 z-40 h-screen`}
      >
        {/* Just an overlay */}
      </div>
      <div className="flex flex-col  items-center lg:flex-row lg:items-start h-screen overflow-auto relative">
        <nav
          className={`mobile-side-nav min-h-screen  ${
            closeMobileNav
              ? '-translate-x-full transition-transform duration-700 ease-in-out'
              : 'translate-x-0 transition-transform duration-700 ease-in-out'
          } bg-[#F0F0F0] fixed top-0 right-0 left-0 lg:hidden h-screen w-[85%] sm:w-[400px] z-50 flex flex-col gap-[30px]`}
        >
          <div className="flex p-8 bg-[#10ACF5] items-center justify-between">
            <section className="flex gap-4 items-center">
              <div className="admin-avatar-wrapper w-[45px] h-[45px] rounded-full">
                <img
                  src={userInfo?.profileImageData.imageUrl}
                  alt="profile-image"
                  className="w-[45px] rounded-[100%]"
                />
              </div>
              <div className="flex flex-col text-white">
                <h3 className="poppins font-[600]">{`${userInfo?.userName}`}</h3>
                <p className="poppins">Admin</p>
              </div>
            </section>
            <div
              onClick={hideMobileNav}
              className="close-side-nav-icon-wrapper cursor-pointer w-[35px] h-[35px] rounded-full border border-white px-[2px] py-[2.2px]"
            >
              <HiOutlineXMark className="text-3xl text-white" />
            </div>
          </div>
          <section className="px-3 pt-4 pb-24" style={{ height: '100%' }}>
            <div className="flex flex-col justify-between px-5 gap-6 h-full lg:w-1/4">
              <section className="flex flex-col justify-center gap-9 lg:w-1/4 lg:bg-[#F1F1F1]">
                <div
                  onClick={
                    (event) => handleNav(event, { nav: 'Home', to: '/' })
                    // hideMobileNav()
                  }
                  className={
                    nav == 'Home'
                      ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer'
                      : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer'
                  }
                >
                  <HiHome className="text-[25px]" />
                  <span>Home</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, { nav: 'Admin', to: '/admins' })
                  }
                  className={
                    nav == 'Admin'
                      ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer'
                      : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer'
                  }
                >
                  <HiUsers className="text-[25px]" />
                  <span>Admins</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, {
                      nav: 'Hospitals Enrolment',
                      to: '/hospitals-enrolment'
                    })
                  }
                  className={
                    nav == 'Hospitals Enrolment'
                      ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer'
                      : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer'
                  }
                >
                  <HiSquaresPlus className="text-[25px]" />{' '}
                  <span className="poppins">Hospital Enrolment</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, { nav: 'Specialist', to: '/specialists' })
                  }
                  className={
                    nav == 'Specialist'
                      ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer'
                      : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer'
                  }
                >
                  <HiUserGroup
                    className="text-[25px]"
                    // style={{ color: 'gray' }}
                  />
                  <span>Specialists</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, {
                      nav: 'Approved Hospitals',
                      to: '/hospitals'
                    })
                  }
                  className={
                    nav == 'Approved Hospitals'
                      ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer'
                      : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer'
                  }
                >
                  <HiHomeModern className="text-[25px]" />{' '}
                  <span>Approved Hospitals</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, { nav: 'Jobs', to: '/jobs' })
                  }
                  className={
                    nav == 'Jobs'
                      ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer'
                      : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer'
                  }
                >
                  <HiBriefcase className="text-[25px]" /> <span>Jobs</span>
                </div>
              </section>
              <div
                onClick={() => {
                  hideMobileNav();
                  confirmLogout();
                }}
                className={
                  nav == 'Log Out'
                    ? 'text-[#10ACF5] flex items-center gap-4 active:text-[#10ACF5] cursor-pointer mt-auto'
                    : 'flex items-center gap-4 text-sm text-[#9F9F9F] font-normal hover:text-[#10ACF5] cursor-pointer mt-auto'
                }
              >
                <HiArrowLeftCircle className="text-[25px]" /> Log Out
              </div>
            </div>
          </section>
        </nav>
        <nav className="mobile-top-nav fixed top-0 left-0 right-0 lg:hidden flex justify-between w-full bg-[#F0F0F0] py-2 px-3 sm:px-5 z-30">
          <Link to="/" className="branding flex items-center gap-2">
            <img src={logo} alt="brand" className="w-[40px]" />
            <h5 className="poppins font-[500] text-[14px]">
              Private <br /> Practice
            </h5>
          </Link>
          <section className="flex items-center gap-4 sm:gap-6">
            <div className="notification-icon-wrapper relative">
              <IoIosNotificationsOutline className="text-[30px]" />
              <div
                className="absolute bg-[#10ACF5] w-5 h-5 rounded-full text-white top-[-7px] text-[12px] 
            flex items-center justify-center"
              >
                3
              </div>
            </div>
            <div
              onClick={showMobileNav}
              className="mobile-nav-bar-icon-wrapper cursor-pointer lg:hidden w-[35px] h-[35px] rounded-full border border-gray-500 px-[4px] py-[4.2px]"
            >
              {/* <HiOutlineBars2 strokeWidth={1.5} className="w-6 h-6 text-black" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-black"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </div>
          </section>
        </nav>
        <div className="side-nav-for-larger-screens hidden lg:flex flex-col justify-between px-3 h-[70%] lg:h-full w-3/12 bg-[var(--nav-ver--bg-color)]">
          <div className="flex items-center gap-[10px] p-5 h-24 mb-12 lg:h-[100px] lg:mb-12 lg:px-[30px]">
            <img src={logo} className="w-10" alt="brand" />
            <h4 className="poppins font-[500] text-[16px]">Private Practice</h4>
          </div>
          <div className="flex flex-col justify-between px-5 lg:px-[30px] gap-4 h-full ml-2">
            <div className="flex flex-col justify-between gap-8 lg:mb-12">
              <div
                onClick={(event) => handleNav(event, { nav: 'Home', to: '/' })}
                className={
                  nav == 'Home'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiHome className="text-[25px]" />
                <span className="poppins">Home</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Admin', to: '/admins' })
                }
                className={
                  nav == 'Admin'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiUsers className="text-[25px]" />{' '}
                <span className="poppins">Admins</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, {
                    nav: 'Hospitals Enrolment',
                    to: '/hospitals-enrolment'
                  })
                }
                className={
                  nav == 'Hospitals Enrolment'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiSquaresPlus className="text-[25px]" />{' '}
                <span className="poppins">Hospital Enrolment</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Specialist', to: '/specialists' })
                }
                className={
                  nav == 'Specialist'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiUserGroup
                  className="text-[25px]"
                  // style={{ color: 'gray' }}
                />
                <span className="poppins">Specialists</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, {
                    nav: 'Approved Hospitals',
                    to: '/hospitals'
                  })
                }
                className={
                  nav == 'Approved Hospitals'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiHomeModern className="text-[25px]" />{' '}
                <span className="poppins">Approved Hospitals</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Jobs', to: '/jobs' })
                }
                className={
                  nav == 'Jobs'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiBriefcase className="text-[25px]" />{' '}
                <span className="poppins">Jobs</span>
              </div>
              <div
                onClick={confirmLogout}
                className={
                  nav == 'Log Out'
                    ? 'flex items-center gap-4 text-[#10ACF5] active:text-[#10ACF5] active:cursor-pointer text-base'
                    : 'flex items-center gap-4 text-base font-normal text-[#9F9F9F] hover:text-[#10ACF5] hover:cursor-pointer'
                }
              >
                <HiArrowLeftCircle className="text-[25px]" />{' '}
                <span className="poppins">Log Out</span>
              </div>
            </div>
          </div>
        </div>
        <div className="top-nav-for-larger-screens_wrapper flex flex-col w-[85%] h-full overflow-y-auto">
          <div className="top-nav-for-larger-screens bg-[#10ACF5] text-[#FFF] hidden lg:flex items-center justify-center p-[30px] h-24 w-full">
            <div className="w-full flex gap-4 items-center">
              <div className="admin-avatar-wrapper w-[45px] h-[45px] rounded-full bg-gray-400">
                <img
                  src={userInfo?.profileImageData.imageUrl}
                  alt="profile-image"
                  className="w-[45px] rounded-[100%]"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="poppins font-[600] m-0">{`${userInfo?.userName}`}</h3>
                <p className="poppins m-0">Admin</p>
              </div>
            </div>
            <div className="relative pr-4">
              <IoIosNotificationsOutline className="text-[30px]" />
              <div
                className="absolute top-[-13px] right-[7px] bg-white w-[25px] h-[25px] rounded-full 
              text-gray-800 text-center font-bold pt-[4px]"
              >
                25
              </div>
            </div>
          </div>
          <div
            className="w-full lg:w-[90%] mt-[75px] lg:mt-[25px] mx-auto p-3 sm:p-[20px] lg:px-0 lg:py-[40px] pb-[60px] overflow-y-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {children}
            {/* <Outlet /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
