import React from "react";
import "./styles/specialistdetails.css";
import { Link,useParams,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHospitalMutation } from "../slices/usersApiSlice";
import { setHospital,setNav } from "../slices/usersSlice";
import { Rating } from "react-simple-star-rating";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import profile from "./../assets/hospitalAvatar.png";
import stars from "./../assets/stars.png";
import PersonalDetails from "./PersonalDetails";

const Hospital = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  dispatch(setNav("Hospital"))

  const [hospitalApiCall, { isLoading }] = useHospitalMutation();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await hospitalApiCall(userId).unwrap();
        dispatch(setHospital( res.data ));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);
  const { hospital } = useSelector((state) => state.users);
  
 
  return (
    <section className="specialist-details">
      <header className="specialist-details-header">
        <nav className="specialist-details-header-nav">
          <button className="nav-back" onClick={()=> navigate(-1)}>
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
              <img src={profile} alt="" className="specialist-detail-profile" />
              <div className="specialist-details-sec-first-1-info">
                <h1>{hospital?.hospitalName}</h1>
                <p>HOSPITAL</p>
                <Rating size={"25px"} readonly={true} initialValue={hospital?.rating ? hospital?.rating : 5} />
                {/* <h3>34 Years Old</h3> */}
              </div>
            </div>
            <div className="specialist-details-sec-first-2">
              {/* <div className="total-earn">
                <p>Total Earnings</p>
                <h1>₦326,200,000.23</h1>
              </div> */}
              <div className="balance">
                <div className="main-bal">
                  <p>Main Balance</p>
                  <h3>₦{hospital?.wallet?.balance}</h3>
                </div>
                <div className="book-bal">
                  <p>Book Balance</p>
                  <h4>₦{hospital?.wallet?.bookBalance}</h4>
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
        <PersonalDetails user={"hospital"} data={hospital} />
      </div>
    </section>
  );
};

export default Hospital;
