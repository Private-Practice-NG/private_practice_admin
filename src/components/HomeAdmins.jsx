// import React from "react";
import './styles/homeadmins.css';
import AdminListCard from './AdminListCard';
import { Link } from 'react-router-dom';

const HomeAdmins = ({ home, dashboardInfo, admins }) => {
  return (
    <div className="home-admins">
      <header className="flex justify-between items-center">
        <h1 className="home-admins-title poppins font-[500] text-[14px] sm:text-[16px]">
          Admins
        </h1>
        <Link
          to="/admins/create-admin-account"
          className="px-6 py-3 rounded-[7px] bg-[#19BE3E] text-white poppins text-[12px] sm:text-[14px]"
        >
          Add Admin
        </Link>
      </header>
      <div className="home-admin-cards">
        {dashboardInfo &&
          dashboardInfo?.admins.map((user, index) => (
            <AdminListCard
              key={index}
              id={user?._id}
              name={user?.name}
              email={user?.email}
              activated={user?.activated}
              profileImg={user?.profileImg}
            />
          ))}
        {admins &&
          admins.map((user, index) => (
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
          <Link to="/admins" className="home-admin-view-all poppins mt-10">
            View All
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeAdmins;
