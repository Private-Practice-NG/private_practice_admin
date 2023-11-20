import React from "react";
import "./styles/specialistdetails.css";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import profile from "./../assets/avatar-icon.png";
import stars from "./../assets/stars.png";
import PersonalDetails from "./PersonalDetails";
import JobsInstance from "./JobsInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useSpecialistMutation,
  useActivateSpecialistMutation,
  useVerifySpecialistMutation,
} from "../slices/usersApiSlice";
import { setSpecialist, setNav } from "../slices/usersSlice";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";



const SpecialistDetails = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState("personalDet");
  const { userId } = useParams();

  const dispatch = useDispatch();
  const [specialistApiCall, { isLoading }] = useSpecialistMutation();

  const [activateSpecialist] = useActivateSpecialistMutation();
  const [VerifySpecialist] = useVerifySpecialistMutation();

  useEffect(() => {
    dispatch(setNav("Specialist"));
    async function fetchData() {
      try {
        const res = await specialistApiCall(userId).unwrap();
        dispatch(setSpecialist(res.data));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  const handleActivate = async (e) => {
    try {
      const nActivated = !specialist?.activated;
      const data = { id: specialist?._id, activated: nActivated };
      const res = await activateSpecialist(data).unwrap();
      dispatch(setSpecialist(res.data));
      const text = nActivated ? "Activated" : "Deactivated ";
      toast.success(`Specialist Account ${text}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleVerify = async (e) => {
    try {
      const res = await VerifySpecialist(specialist?._id).unwrap();
      dispatch(setSpecialist(res.data));
      toast.success(`Specialist Account Verified`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const { specialist } = useSelector((state) => state.users);

  return (
    <section className="specialist-details">
      {isLoading ? (
        <>
          <div className="spinner-details">
            <FadeLoader
              color={"#10ACF5"}
              loading={isLoading}
              // cssOverride={override}
              size={300}
              height={50}
              width={5}
              radius={10}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <>
          <header className="specialist-details-header">
            <nav className="specialist-details-header-nav">
              <button className="nav-back" onClick={() => navigate(-1)}>
                <MdOutlineArrowBackIosNew /> <span>Back</span>
              </button>
              <div className="nav-right">
                {specialist?.verified.profile ? (
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
                {!specialist?.verified.profile && (
                  <>
                    <button className="sucess" onClick={handleVerify}>
                      Verify
                    </button>
                  </>
                )}
                {specialist?.activated ? (
                  <>
                    <button className="warn" onClick={handleActivate}>
                      Deactivate
                    </button>
                  </>
                ) : (
                  <>
                    <button className="sucess" onClick={handleActivate}>
                      Activate
                    </button>
                  </>
                )}

                <Link>Reset Password</Link>
              </div>
            </nav>
            <section className="specialist-details-sec">
              <div className="specialist-details-sec-first">
                <div className="specialist-details-sec-first-1">
                  <img
                    src={profile}
                    alt=""
                    className="specialist-detail-profile"
                  />
                  <div className="specialist-details-sec-first-1-info">
                    <h1>
                      {specialist?.firstName} {specialist?.lastName}
                    </h1>
                    <p>DOCTOR</p>
                    {/* <img src={stars} alt="stars"  className="info-stars"/> */}
                    <Rating
                      size={"25px"}
                      readonly={true}
                      initialValue={specialist?.rating ? specialist?.rating : 5}
                    />
                    <h3> {specialist?.age}</h3>
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
                      <h3>₦{`${specialist?.wallet.balance}`}</h3>
                    </div>
                    <div className="book-bal">
                      <p>Book Balance</p>
                      <h4>₦{`${specialist?.wallet.bookBalance}`}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="specialist-details-sec-second">
                <button
                  className={details == "personalDet" ? "active" : undefined}
                  onClick={() => {
                    setDetails("personalDet");
                  }}
                >
                  Personal Details
                </button>
                <button
                  className={details == "jobCompleted" ? "active" : undefined}
                  onClick={() => {
                    setDetails("jobCompleted");
                  }}
                >
                  Jobs Completed ({specialist?.completedJobs.jobsCompleted})
                </button>
                <button
                  className={details == "pendingJobs" ? "active" : undefined}
                  onClick={() => {
                    setDetails("pendingJobs");
                  }}
                >
                  Pending Jobs ({specialist?.pendingJobs.pendingJobslength})
                </button>
                <button
                  className={details == "declinedJob" ? "active" : undefined}
                  onClick={() => {
                    setDetails("declinedJob");
                  }}
                >
                  Declined Jobs ({specialist?.declinedJobs.declinedJobslength})
                </button>
              </div>
            </section>
          </header>
          <div className="specialist-details-details">
            {details == "personalDet" && (
              <PersonalDetails user={"specialist"} data={specialist} />
            )}
            {details == "jobCompleted" && (
              <JobsInstance
                user={"specialist"}
                data={specialist?.completedJobs.completedJobInbox}
              />
            )}
            {details == "pendingJobs" && (
              <JobsInstance
                user={"specialist"}
                data={specialist?.pendingJobs.pendingJobsInbox}
              />
            )}
            {details == "declinedJob" && (
              <JobsInstance
                user={"specialist"}
                data={specialist?.declinedJobs.declinedJobsInbox}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SpecialistDetails;
