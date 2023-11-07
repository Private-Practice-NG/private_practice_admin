import React from "react";
import "../pages/styles/userstab.css";
import { Link } from "react-router-dom";
import profile from "./../assets/avatar.png";
import stars from "./../assets/stars.png";
const UserProfileCard = ({user}) => {
  return (
    <div className="user-profile-card">
      <div className="user-profile-card-status">
        {true ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <circle cx="7.5" cy="7.5" r="7.5" fill="#19BE3E" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <circle cx="7.5" cy="7.5" r="7.5" fill="#9CA09D" />
          </svg>
        )}
      </div>
      <div className="user-profile-card-flex">
        <img
          className="user-profile-card-img"
          src={profile}
          alt="user-profile-img"
        />
        <p>David Paul</p>
        <div className="user-profile-card-stars">
          <img src={stars} alt="user-stars" />
        </div>
        <Link to={`/${user}/001`} className={true && "user-profile-card-active"}>
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;
