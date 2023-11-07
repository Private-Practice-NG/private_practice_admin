import React from "react";
import "./styles/userstab.css";
import { CiSearch } from "react-icons/ci";
import UserProfileCard from "../components/UserProfileCard";
const Specialists = () => {
  return (
    <div className="users-tab">
      <header className="users-tab-header">
        <h1>Specialist</h1>
        <div className="users-tab-input">
          <CiSearch />
          <input type="text" placeholder="Search Specialist" />
        </div>
        <div className="users-tab-sort">
          <svg
            width="31"
            height="20"
            viewBox="0 0 31 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 2H29.2582"
              stroke="#292D32"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M4.87646 10.1273H24.382"
              stroke="#292D32"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M11.3782 18.2546H17.88"
              stroke="#292D32"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <p>Sort</p>
        </div>
      </header>
      <section className="users-tab-profiles">
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />
        <UserProfileCard user='specialist' />

      </section>
    </div>
  );
};

export default Specialists;