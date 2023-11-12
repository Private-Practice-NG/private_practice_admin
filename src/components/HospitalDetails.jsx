import React from "react";
import "./styles/specialistdetails.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import profile from './../assets/avatar-info.png'
import stars from './../assets/stars.png'
import PersonalDetails from "./PersonalDetails";
import JobsCompleted from "./JobsInstance";
const HospitalDetails = () => {
  return (
    <section className="specialist-details">
      <header className="specialist-details-header">
        <nav className="specialist-details-header-nav">
          <button className="nav-back">
            <MdOutlineArrowBackIosNew /> <span>Back</span>
          </button>
          <div className="nav-right">
            {true ? (
              <div className="nav-right-status">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <circle cx="8.5" cy="8.5" r="8.5" fill="#19BE3E" />
                </svg>{" "}
                <span>Verified</span>{" "}
              </div>
            ) : (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#9CA09D" />
                </svg>{" "}
                <span>Unverified</span>
              </div>
            )}
            <Link>Reset Password</Link>
          </div>
        </nav>
        <section className="specialist-details-sec">
            <div className="specialist-details-sec-first">
                <div className="specialist-details-sec-first-1">
                    <img src={profile} alt="" className="specialist-detail-profile"/>
                    <div className="specialist-details-sec-first-1-info">
                        <h1>David Paul</h1>
                        <p>DOCTOR</p>
                        <img src={stars} alt="stars"  className="info-stars"/>
                        <h3>34 Years Old</h3>
                        <Link to="/" className="view-doc">View Documents</Link>
                    </div>
                </div>
                <div className="specialist-details-sec-first-2">
                    <div className="total-earn">
                        <p>Total Earnings</p>
                        <h1>₦326,200,000.23</h1>
                    </div>
                    <div className="balance">
                        <div className="main-bal">
                            <p>Main Balance</p>
                            <h3>₦326,200</h3>
                        </div>
                        <div className="book-bal">
                            <p>Book Balance</p>
                            <h4>₦426,200</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="specialist-details-sec-second">
                <button className="active">Personal Details</button>
                <button>Jobs Completed (6)</button>
                <button>Pending Jobs (2)</button>
                <button>Declined Jobs (9)</button>
                
            </div>
        </section>
      </header>
      <div className="specialist-details-details">
        <PersonalDetails />
      </div>
    </section>
  );
};

export default HospitalDetails;
