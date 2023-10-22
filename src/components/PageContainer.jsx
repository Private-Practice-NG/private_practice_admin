import React from 'react'
import './styles/pagecont.css'
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png'
import profile from './../assets/profile.png'
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { MdLocalHospital } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import UsersTab from './UsersTab';
import Hospital from './HospitalTab';
import SpecialistDetails from './SpecialistDetails';
const PageContainer = () => {
  return (
    <div className='page-cont'>
        <div className="vertical-nav">
            <div className="vertical-nav-brand">
                <img src={logo} alt="brand" />
                <h1>Private Practice</h1>
            </div>
            <div className="vertical-nav-links">
                <div className="vertical-nav-links-top">
                    <Link to="/"><AiFillHome/> Home</Link>
                    <Link to="/"><BiSolidUser/> Admin</Link>
                    <Link to="/"><MdLocalHospital/> Hospital</Link>
                    <Link to="/"><GrUserWorker/> Specialist</Link>
                    <Link to="/"><FaHospitalAlt/> Hospital</Link>
                </div>
                    <Link to="/"><MdCancel/> Log Out</Link>
            </div>
        </div>
        <div className='page-cont-2'>
            <div className="top-hori-nav">
                <div className="top-hori-nav-pro">
                        <img src={profile} alt="profile-image" />
                        <div className="top-hori-nav-pro-details">
                            <h3>Abdul-Wasiu</h3>
                            <p>Admin</p>
                        </div>
                </div>
                <div className="top-hori-nav-pro-noti">
                        <IoIosNotificationsOutline />
                        <p>3</p>
                </div>
            </div>
            <div className="page-cont-outlet">
                <Home />
            </div>
        </div>
    </div>
  )
}

export default PageContainer