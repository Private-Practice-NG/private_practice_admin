// import React from "react";
import AdminProfileCard from '../pages/Admins/components/AdminProfileCard';
import './styles/homeadmins.css';
// import AdminListCard from './AdminListCard';
import { Link } from 'react-router-dom';

const HomeAdmins = ({ adminHomeData }) => {
  console.log(adminHomeData);
  const adminProfilesData = adminHomeData.adminsData.slice(0, 5);
  // console.log(adminProfilesData);

  return (
    <div className="home-admins">
      <header className="flex justify-between items-center mb-[25px]">
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
      <section className="flex flex-col gap-8">
        {adminProfilesData.map((each) => {
          return <AdminProfileCard key={each._id} profileData={each} />;
        })}
      </section>
    </div>
  );
};

export default HomeAdmins;
