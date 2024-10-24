// import React from "react";
// import "../pages/styles/userstab.css";
// import { Link } from "react-router-dom";
// import profile from "./../assets/avatar-icon.png";
// import hosp from "./../assets/hospitalAvatar.png";
// import stars from "./../assets/stars.png";
// import { Rating } from "react-simple-star-rating";
// const UserProfileCard = ({ user, hospital,specialist }) => {
//   return (
//     <div className="user-profile-card">
//       {hospital && (
//         <>
//           <div className="user-profile-card-status">
//             {true ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="15"
//                 height="15"
//                 viewBox="0 0 15 15"
//                 fill="none"
//               >
//                 <circle cx="7.5" cy="7.5" r="7.5" fill="#19BE3E" />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="15"
//                 height="15"
//                 viewBox="0 0 15 15"
//                 fill="none"
//               >
//                 <circle cx="7.5" cy="7.5" r="7.5" fill="#9CA09D" />
//               </svg>
//             )}
//           </div>
//           <div className="user-profile-card-flex">
//             <img
//               className="user-profile-card-img"
//               src={hosp}
//               alt="user-profile-img"
//             />
//             <p>{hospital?.hospitalName}</p>
//             <div className="user-profile-card-stars">
//               {/* <img src={stars} alt="user-stars" /> */}
//               <Rating size={"25px"} readonly={true} initialValue={hospital?.rating ? hospital?.rating : 5} />
//             </div>
//             <Link to={`/${user}/${hospital?._id}`} className={true && "user-profile-card-active"}>
//               View Profile
//             </Link>
//           </div>
//         </>
//       )}
//       {specialist && (
//         <>
//           <div className="user-profile-card-status">
//             {specialist?.verified.profile ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="15"
//                 height="15"
//                 viewBox="0 0 15 15"
//                 fill="none"
//               >
//                 <circle cx="7.5" cy="7.5" r="7.5" fill="#19BE3E" />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="15"
//                 height="15"
//                 viewBox="0 0 15 15"
//                 fill="none"
//               >
//                 <circle cx="7.5" cy="7.5" r="7.5" fill="#9CA09D" />
//               </svg>
//             )}
//           </div>
//           <div className="user-profile-card-flex">
//             <img
//               className="user-profile-card-img"
//               src={profile}
//               alt="user-profile-img"
//             />
//             <p>{specialist?.firstName}</p>
//             <div className="user-profile-card-stars">
//               {/* <img src={stars} alt="user-stars" /> */}
//               <Rating size={"23px"} readonly={true} initialValue={specialist?.rating ? specialist?.rating : 5} />
//             </div>
//             <Link to={`/${user}/${specialist?._id}`} className={true && "user-profile-card-active"}>
//               View Profile
//             </Link>
//           </div>
//         </>
//       )}

//     </div>
//   );
// };

// export default UserProfileCard;
