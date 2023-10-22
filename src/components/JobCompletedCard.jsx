import React from "react";
import "./styles/jobscompleted.css";
import hos1 from './../assets/hos-img.png'
import hos2 from './../assets/hos-img1.png'
import stars from './../assets/stars.png'
const JobCompletedCard = () => {
  return (
    <div className="job-completed-card">
      <div className="job-completed-card-details">
        <img
          src={hos2}
          alt="hospital-img"
          className="job-completed-card-hos-img"
        />
        <div className="job-completed-details-context">
          <span>
            <h1>Intestine Surgery</h1>
            <h4>July 5, 2023 - July 10, 2023</h4>
          </span>
          <span>
            <img src={stars} alt="stars" />
            <p>
              Always putting on a smiling face, and also spewing encouraging
              words.
            </p>
          </span>
        </div>
      </div>
      <p className="job-completed-price">₦128,435.23</p>
    </div>
  );
};

export default JobCompletedCard;
