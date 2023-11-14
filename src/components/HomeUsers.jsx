import React from "react";
import "./styles/homeusers.css";
import hos1 from "./../assets/hospitalAvatar.png";
import hos2 from "./../assets/hos2.png";
import stars from "./../assets/stars.png";
import avatar from "./../assets/avatar-icon.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
const HomeUsers = () => {

  const {dashboardInfo} = useSelector((state)=> state.dashboard);

  return (
    <div className="home-users">
      {/* hospital section */}
      <div className="home-user-hos">
        <h1>Hospitals</h1>
        {dashboardInfo?.hospital.map((user, index) => (
          <div key={index} className="home-user-hos-pro">
            <div className="home-img-title">
                <div className="home-profile-img">
                    <img src={hos1} alt="hospital 1" />
                </div>
                <div className="hospital-title">
                    <p>{user?.hospitalName}</p>
                    {/* <img src={stars} alt="rank" /> */}
                    <Rating size={"25px"} readonly={true} initialValue={user?.rating ? user?.rating : 5} />
                </div>
            </div>
            <Link to={`/hospital/${user?._id}`} className="btn-view-profile">View Profile</Link>
          </div>
        ))}
        <Link to="/hospitals" className="btn-view-all">View All</Link>
      </div>

      {/* specialist section */}
      <div className="home-user-spec">
        <h1>Specialist</h1>
        <div className="home-user-spec-pros">
            {dashboardInfo?.specialist.map((user,index) =>(
              <div key={index} className="home-user-spec-pro">
                  <div className="home-avatar">
                      <img src={avatar} alt="avatar" />
                     
                  </div>
                  <p>{user?.firstName}</p>
                  {/* <img src={stars} alt="stars" className="spec-stars"/> */}
                  <Rating size={"20px"} readonly={true} initialValue={user?.rating ? user?.rating : 5} />
                  <Link to={`/specialist/${user?._id}`} className="btn-view-profile">View Profile</Link>
              </div>
               
            ))}
        </div>

        <Link to="/specialists" className="btn-view-all">View All</Link>
      </div>
    </div>
  );
};

export default HomeUsers;
