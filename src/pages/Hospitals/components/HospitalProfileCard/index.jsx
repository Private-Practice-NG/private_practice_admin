// import React from "react";
// import './admin-card.css';
import mockAvatar from '../../../../assets/img-3.png';
// import { useSelector, useDispatch } from "react-redux";
// import { useActivateAdminMutation } from "../slices/usersApiSlice";
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import stars from '../../../../assets/stars.png';
import { Rating } from 'react-simple-star-rating';

const HospitalProfileCard = ({ profileData }) => {
  const mockActivated = true;
  //   console.log(profileData);
  //   const mockActivated = true;
  //   console.log(adminProfilesData);
  // const [activateAdminApi, { isLoading }] = useActivateAdminMutation();

  //   const handleActivate = async () => {
  //     try {
  //       const nActivated = !active;
  //       // const data = { id, activated: nActivated };
  //       // const res = await activateAdminApi(data).unwrap();
  //       setActivate(nActivated);
  //       const text = nActivated ? 'Activated' : 'Deactivated ';
  //       toast.success(`User ${text}`);
  //     } catch (error) {
  //       toast.error(error?.data?.message || error.error);
  //     }
  //   };

  return (
    <div
      // key={each._id}
      className="hospital-profile-card border-t-[1px] border-b-[1px] py-3 border-gray-300 flex flex-col gap-x-[40px] gap-y-[30px] sm:flex-row sm:justify-between sm:items-center"
    >
      <div className="w-full md:w-4/12 flex gap-4 items-center">
        <div className="w-[45px] h-[45px] rounded-full">
          <img src={mockAvatar} alt="profile-image" className="w-[45px]" />
        </div>
        <div className="flex flex-col item-center gap-[5px]">
          <h3 className="font-semibold poppins">{profileData.hospitalName}</h3>
          <Rating
            size={'20px'}
            readonly={true}
            initialValue={profileData.rating}
            iconsCount={5}
          />
          {/* <h3 className="font-semibold">{each.name}</h3>
                <p>{each.email}</p> */}
        </div>
      </div>
      <section className="w-full md:w-8/12 flex justify-between items-center flex-row">
        {mockActivated ? (
          <button
            className="flex gap-3 items-center"
            //   onClick={handleActivate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 27 27"
              fill="none"
            >
              <ellipse
                cx="13.9411"
                cy="13.4545"
                rx="13.0588"
                ry="13.4545"
                fill="#10ACF5"
              />
              <path
                d="M23.1256 13.4546C23.1256 18.7975 18.9626 23.0348 13.9411 23.0348C8.91958 23.0348 4.75659 18.7975 4.75659 13.4546C4.75659 8.11171 8.91958 3.87439 13.9411 3.87439C18.9626 3.87439 23.1256 8.11171 23.1256 13.4546Z"
                fill="#10ACF5"
                stroke="#ECECEC"
                strokeWidth="3"
              />
            </svg>{' '}
            Activated
          </button>
        ) : (
          <button className="flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 27 27"
              fill="none"
            >
              <ellipse
                cx="13.9412"
                cy="13.4546"
                rx="13.0589"
                ry="13.4546"
                fill="#9F9F9F"
              />
              <path
                d="M23.1257 13.4546C23.1257 18.7975 18.9627 23.0348 13.9412 23.0348C8.91971 23.0348 4.75671 18.7975 4.75671 13.4546C4.75671 8.11166 8.91971 3.87433 13.9412 3.87433C18.9627 3.87433 23.1257 8.11166 23.1257 13.4546Z"
                fill="#9F9F9F"
                stroke="#ECECEC"
                strokeWidth="3"
              />
            </svg>{' '}
            Deactivated
          </button>
        )}
        <Link
          to="/"
          className="py-[10px] px-4 rounded-[7px] bg-[#10acf5] text-white"
        >
          View profile
        </Link>
      </section>
    </div>
  );
};

export default HospitalProfileCard;
