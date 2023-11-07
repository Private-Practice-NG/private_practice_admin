import React from "react";
import "./styles/homeadmins.css";
import AdminListCard from "./AdminListCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const HomeAdmins = ({ home }) => {

  const {dashboardInfo} = useSelector((state)=> state.dashboard);
  return (
    <div className="home-admins">
      <h1 className="home-admins-title">Admins</h1>
      <div className="home-admin-cards">
        {
          dashboardInfo?.admins.map((user)=>(
            <AdminListCard id={user?._id} name={user?.name} email= {user?.email} activated={user?.activated} profileImg={user?.profileImg}/>
          ))
        }
        {home && (
          <Link to="/admins" className="home-admin-view-all">
            View All
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeAdmins;
