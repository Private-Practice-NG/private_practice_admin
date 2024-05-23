// import React from 'react';
import '../styles/pagecont.css';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
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
import { useSelector } from 'react-redux';
// import { useLogoutMutation } from '../../slices/usersApiSlice';
// import { logout } from '../../slices/authSlice';
// import { removeDashboard } from '../../slices/dashboardSlice';

const Layout = ({ children }) => {
  const [closeMobileNav, setCloseMobileNav] = useState(true);

  // const [setActive] = useState('Home');
  const { nav } = useSelector((state) => state.users);

  const hideMobileNav = () => {
    setCloseMobileNav(true);
  };

  const showMobileNav = () => {
    setCloseMobileNav(false);
  };

  const handleNav = (event, { /* nav,*/ to }) => {
    // setActive(nav);
    navigate(to);
    hideMobileNav();
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log(userInfo);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (!userInfo) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div
        className={`${closeMobileNav ? 'hidden' : 'block'} overlay text-white overlay-bg fixed top-0 left-0 right-0 z-40 h-screen`}
      >
        {/* Just an overlay */}
      </div>
      <div className="page-cont relative">
        <nav
          className={`mobile-side-nav min-h-screen  ${
            closeMobileNav ? 'nav--slide-out' : 'nav--slide-in'
          } bg-[#F0F0F0] fixed top-0 right-0 left-0 lg:hidden h-screen w-[85%] sm:w-[400px] z-50 flex flex-col gap-[30px]`}
        >
          <div className="flex p-8 bg-[#10ACF5] items-center justify-between">
            <section className="flex gap-4 items-center">
              <div className="admin-avatar-wrapper w-[45px] h-[45px] rounded-full">
                <img
                  src={userInfo?.profileImg}
                  alt="profile-image"
                  className="w-[45px] rounded-[100%]"
                />
              </div>
              <div className="flex flex-col text-white">
                <h3 className="poppins font-[600]">{`${userInfo?.fullName}`}</h3>
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
            <div className="vertical-nav h-full">
              <section className="vertical-nav-links-wrapper">
                <div
                  onClick={
                    (event) => handleNav(event, { nav: 'Home', to: '/' })
                    // hideMobileNav()
                  }
                  className={nav == 'Home' ? 'nav-link active' : 'nav-link'}
                >
                  <HiHome className="text-[25px]" />
                  <span>Home</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, { nav: 'Admin', to: '/admins' })
                  }
                  className={nav == 'Admin' ? 'nav-link active' : 'nav-link'}
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
                      ? 'nav-link active'
                      : 'nav-link'
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
                    nav == 'Specialist' ? 'nav-link active' : 'nav-link'
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
                    handleNav(event, { nav: 'Hospital', to: '/hospitals' })
                  }
                  className={nav == 'Hospital' ? 'nav-link active' : 'nav-link'}
                >
                  <HiHomeModern className="text-[25px]" />{' '}
                  <span>Hospitals</span>
                </div>
                <div
                  onClick={(event) =>
                    handleNav(event, { nav: 'Jobs', to: '/jobs' })
                  }
                  className={nav == 'Jobs' ? 'nav-link active' : 'nav-link'}
                >
                  <HiBriefcase className="text-[25px]" /> <span>Jobs</span>
                </div>
              </section>
              <div
                onClick={logoutHandler}
                className={
                  nav == 'Log Out'
                    ? 'nav-link active mt-auto'
                    : 'nav-link mt-auto'
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
        <div className="side-nav-for-larger-screens vertical-nav hidden lg:block">
          <div className="vertical-nav-brand">
            <img src={logo} alt="brand" />
            <h4 className="poppins font-[500] text-[16px]">Private Practice</h4>
          </div>
          <div className="vertical-nav-links ml-2">
            <div className="vertical-nav-links-top">
              <div
                onClick={(event) => handleNav(event, { nav: 'Home', to: '/' })}
                className={nav == 'Home' ? 'nav-link active' : 'nav-link'}
              >
                <HiHome className="text-[25px]" />
                <span className="poppins">Home</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Admin', to: '/admins' })
                }
                className={nav == 'Admin' ? 'nav-link active' : 'nav-link'}
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
                  nav == 'Hospitals Enrolment' ? 'nav-link active' : 'nav-link'
                }
              >
                <HiSquaresPlus className="text-[25px]" />{' '}
                <span className="poppins">Hospital Enrolment</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Specialist', to: '/specialists' })
                }
                className={nav == 'Specialist' ? 'nav-link active' : 'nav-link'}
              >
                <HiUserGroup
                  className="text-[25px]"
                  // style={{ color: 'gray' }}
                />
                <span className="poppins">Specialists</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Hospital', to: '/hospitals' })
                }
                className={nav == 'Hospital' ? 'nav-link active' : 'nav-link'}
              >
                <HiHomeModern className="text-[25px]" />{' '}
                <span className="poppins">Hospitals</span>
              </div>
              <div
                onClick={(event) =>
                  handleNav(event, { nav: 'Jobs', to: '/jobs' })
                }
                className={nav == 'Jobs' ? 'nav-link active' : 'nav-link'}
              >
                <HiBriefcase className="text-[25px]" />{' '}
                <span className="poppins">Jobs</span>
              </div>
            </div>
            <div
              onClick={logoutHandler}
              className={nav == 'Log Out' ? 'nav-link active' : 'nav-link'}
            >
              <HiArrowLeftCircle className="text-[25px]" />{' '}
              <span className="poppins">Log Out</span>
            </div>
          </div>
        </div>
        <div className="page-cont-2 overflow-y-auto">
          <div className="top-nav-for-larger-screens top-hori-nav hidden lg:flex">
            <div className="top-hori-nav-pro">
              <div className="admin-avatar-wrapper w-[45px] h-[45px] rounded-full bg-gray-400">
                <img
                  src={userInfo?.profileImg}
                  alt="profile-image"
                  className="w-[45[px] rounded-[100%]"
                />
              </div>
              <div className="top-hori-nav-pro-details">
                <h3 className="poppins font-[600]">{`${userInfo?.fullName}`}</h3>
                <p className="poppins">Admin</p>
              </div>
            </div>
            <div className="top-hori-nav-pro-noti">
              <IoIosNotificationsOutline />
              <p>3</p>
            </div>
          </div>
          <div className="page-cont-outlet mt-[75px] lg:mt-0 p-3 sm:p-[20px] lg:px-0 lg:py-[40px] pb-[60px]">
            {children}
            {/* <Outlet /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
