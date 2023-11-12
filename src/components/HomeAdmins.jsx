import React from "react";
import "./styles/homeadmins.css";
import AdminListCard from "./AdminListCard";
import { Link } from "react-router-dom";
const HomeAdmins = ({ home,dashboardInfo,admins}) => {
  return (
    <div className="home-admins">
      <h1 className="home-admins-title">Admins</h1>
      <div className="home-admin-cards">
        {dashboardInfo && dashboardInfo?.admins.map((user,index) => (
          <AdminListCard
            key={index}
            id={user?._id}
            name={user?.name}
            email={user?.email}
            activated={user?.activated}
            profileImg={user?.profileImg}
          />
        ))}
        {admins && admins.map((user,index) => (
          <AdminListCard
            key={index}
            id={user?._id}
            name={user?.name}
            email={user?.email}
            activated={user?.activated}
            profileImg={user?.profileImg}
          />
        ))}
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
