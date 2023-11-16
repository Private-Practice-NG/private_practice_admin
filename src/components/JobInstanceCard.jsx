import React from "react";
import "./styles/jobscompleted.css";
import hos1 from './../assets/hos-img.png'
import hos2 from './../assets/hospitalAvatar.png'
import stars from './../assets/stars.png'
import { Rating } from 'react-simple-star-rating'
const JobInstanceCard = ({data}) => {
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
            <h1>{data?.title}</h1>
            <h4>{data?.from} - {data?.to}</h4>
          </span>
          <span>
            <Rating size={"25px"} readonly={true} initialValue={data?.rating ? data?.rating : 5} />
            <p>
             {data?.review ? data?.review : "No review"}
            </p>
          </span>
        </div>
      </div>
      <p className="job-completed-price">₦{data?.amount}</p>
    </div>
  );
};

export default JobInstanceCard;
