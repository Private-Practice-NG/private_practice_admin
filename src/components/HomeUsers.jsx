// // import React from "react";
// import './styles/homeusers.css';
// // import hos1 from './../assets/hospitalAvatar.png';
// import HospitalProfileCard from '../pages/Hospitals/components/HospitalProfileCard';
// // import hos2 from "./../assets/hos2.png";
// // import stars from './../assets/stars.png';
// import { Link } from 'react-router-dom';
// // import { useSelector } from 'react-redux';
// import SpecialistProfileCard from '../pages/Specialists/components/SpecialistProfileCard';

// const HomeUsers = ({ adminHomeData }) => {
//   console.log(adminHomeData);
//   // const { dashboardInfo } = useSelector((state) => state.dashboard);

//   return (
//     <div className="home-users">
//       {/* hospital section */}
//       <div className="home-user-hos">
//         <h1 className="poppins mb-4">Hospitals</h1>
//         <section className="flex flex-col justify-between mt-6 min-h-[450px] lg:min-h-[410px]">
//           <section className="flex flex-col gap-8">
//             {adminHomeData.hospitalsData.map((each) => {
//               return <HospitalProfileCard key={each._id} profileData={each} />;
//             })}
//           </section>

//           <Link to="/hospitals" className="btn-view-all poppins mt-8">
//             View All
//           </Link>
//         </section>
//       </div>

//       {/* specialist section */}
//       <div className="home-user-spec">
//         <h1 className="poppins">Specialists</h1>
//         <section className="flex flex-col justify-between mt-6 min-h-[450px] lg:min-h-[410px]">
//           <section className="grid grid-cols-2 gap-4">
//             {adminHomeData.specialistsData.slice(0, 2).map((each) => {
//               return (
//                 <SpecialistProfileCard
//                   key={each._id}
//                   specialistProfile={each}
//                 />
//               );
//             })}
//           </section>

//           <Link to="/specialists" className="btn-view-all poppins">
//             View All
//           </Link>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomeUsers;

// import React from "react";
import './styles/homeusers.css';
import HospitalProfileCard from '../pages/Hospitals/components/HospitalProfileCard';
import { Link } from 'react-router-dom';
import SpecialistProfileCard from '../pages/Specialists/components/SpecialistProfileCard';

const HomeUsers = ({
  adminHomeData = { hospitalsData: [], specialistsData: [] }
}) => {
  console.log(adminHomeData);

  return (
    <div className="home-users">
      {/* hospital section */}
      <div className="home-user-hos">
        <h1 className="poppins mb-4">Hospitals</h1>
        <section className="flex flex-col justify-between mt-6 min-h-[450px] lg:min-h-[410px]">
          <section className="flex flex-col gap-8">
            {adminHomeData.hospitalsData.map((each) => (
              <HospitalProfileCard key={each._id} profileData={each} />
            ))}
          </section>
          <Link to="/hospitals" className="btn-view-all poppins mt-8">
            View All
          </Link>
        </section>
      </div>

      {/* specialist section */}
      <div className="home-user-spec">
        <h1 className="poppins">Specialists</h1>
        <section className="flex flex-col justify-between mt-6 min-h-[450px] lg:min-h-[410px]">
          <section className="grid grid-cols-2 gap-4">
            {adminHomeData.specialistsData.slice(0, 2).map((each) => (
              <SpecialistProfileCard key={each._id} specialistProfile={each} />
            ))}
          </section>
          <Link to="/specialists" className="btn-view-all poppins">
            View All
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomeUsers;
