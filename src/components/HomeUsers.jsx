import HospitalProfileCard from '../pages/Hospitals/components/HospitalProfileCard';
import { Link } from 'react-router-dom';
import SpecialistProfileCard from '../pages/Specialists/components/SpecialistProfileCard';

const HomeUsers = ({
  adminHomeData = {
    dashboardData: { hospitalsData: [], specialistsData: [] },
    accessToken: ''
  }
}) => {
  console.log('HomeUsers received data:', adminHomeData);

  const { allHospitals = [], allSpecialists = [] } =
    adminHomeData.dashboardData || {};
  console.log('Hospitals Data:', allHospitals);
  console.log('Specialists Data:', allSpecialists);

  return (
    <div className="flex flex-wrap items-start justify-between gap-8">
      {/* Hospital section */}
      <div className="block w-full bg-[#ECECEC] p-3 rounded-lg lg:min-h-[410px]">
        <h1 className="font-normal text-lg mb-4">Hospitals</h1>
        <section className="flex flex-col justify-between mt-6 min-h-[450px]">
          <section className="flex flex-col gap-8">
            {allHospitals.length > 0 ? (
              allHospitals
                .slice(0, 3)
                .map((each) => (
                  <HospitalProfileCard key={each._id} profileData={each} />
                ))
            ) : (
              <p>No hospitals available</p>
            )}
          </section>
          <Link
            to="/hospitals-enrolment"
            className="w-full border-2 border-[#10ACF5] bg-[#10ACF5] text-white text-center text-xs py-3 rounded-lg mt-8"
          >
            View All
          </Link>
        </section>
      </div>

      {/* Specialist section */}
      <div className="block w-full bg-[#ECECEC] p-3 rounded-lg lg:min-h-[410px]">
        <h1 className="font-normal text-lg">Specialists</h1>
        <section className="flex flex-col justify-between mt-6 min-h-[450px]">
          <section className="grid sm:grid-cols-2 gap-4">
            {allSpecialists.length > 0 ? (
              allSpecialists
                .slice(0, 2)
                .map((each) => (
                  <SpecialistProfileCard
                    key={each._id}
                    specialistProfile={each}
                  />
                ))
            ) : (
              <p>No specialists available</p>
            )}
          </section>
          <Link
            to="/specialists"
            className="w-full border-2 border-[#10ACF5] bg-[#10ACF5] text-white text-center text-xs py-3 rounded-lg mt-4"
          >
            View All
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomeUsers;
