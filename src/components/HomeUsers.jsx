import React from "react";
import "./styles/homeusers.css";
import hos1 from "./../assets/hos1.png";
import hos2 from "./../assets/hos2.png";
import stars from "./../assets/stars.png";
import avatar from "./../assets/avatar.png";
import { Link } from "react-router-dom";
const HomeUsers = () => {
  return (
    <div className="home-users">
      {/* hospital section */}
      <div className="home-user-hos">
        <h1>Hospitals</h1>
        <div className="home-user-hos-pro">
            <div className="home-img-title">
                <div className="home-profile-img">
                    <img src={hos1} alt="hospital 1" />
                </div>
                <div className="hospital-title">
                    <p>Nirsal Premier Hospital</p>
                    <img src={stars} alt="rank" />
                </div>
            </div>
          <Link to="/" className="btn-view-profile">View Profile</Link>
        </div>
        <div className="home-user-hos-pro">
            <div className="home-img-title">        
                <div className="home-profile-img">
                    <img src={hos2} alt="hospital 2" />
                </div>
                <div className="hospital-title">
                    <p>Kingscare Hospital</p>
                    <img src={stars} alt="rank" />
                </div>
            </div>
          <Link to="/" className="btn-view-profile">View Profile</Link>
        </div>
        <Link to="/" className="btn-view-all">View All</Link>
      </div>

      {/* specialist section */}
      <div className="home-user-spec">
        <h1>Specialist</h1>
        <div className="home-user-spec-pros">
            <div className="home-user-spec-pro">
                <div className="home-avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <p>David Paul</p>
                <img src={stars} alt="stars" className="spec-stars"/>
                <Link to="/" className="btn-view-profile">View Profile</Link>
            </div>
            <div className="home-user-spec-pro">
                <div className="home-avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <p>David Paul</p>
                <img src={stars} alt="stars" className="spec-stars"/>
                <Link to="/" className="btn-view-profile">View Profile</Link>
            </div>
            <div className="home-user-spec-pro">
                <div className="home-avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <p>David Paul</p>
                <img src={stars} alt="stars" className="spec-stars"/>
                <Link to="/" className="btn-view-profile">View Profile</Link>
            </div>
        </div>

        <Link to="/" className="btn-view-all">View All</Link>
      </div>
    </div>
  );
};

export default HomeUsers;
