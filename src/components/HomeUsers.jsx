import './styles/homeusers.css';
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
    <div className="home-users">
      {/* Hospital section */}
      <div className="home-user-hos">
        <h1 className="poppins mb-4">Hospitals</h1>
        <section className="flex flex-col justify-between mt-6 min-h-[450px] lg:min-h-[410px]">
          <section className="flex flex-col gap-8">
            {allHospitals.length > 0 ? (
              allHospitals.map((each) => (
                <HospitalProfileCard key={each._id} profileData={each} />
              ))
            ) : (
              <p>No hospitals available</p>
            )}
          </section>
          <Link to="/hospitals" className="btn-view-all poppins mt-8">
            View All
          </Link>
        </section>
      </div>

      {/* Specialist section */}
      <div className="home-user-spec">
        <h1 className="poppins">Specialists</h1>
        <section className="flex flex-col justify-between mt-6 min-h-[450px] lg:min-h-[410px]">
          <section className="grid grid-cols-2 gap-4">
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
          <Link to="/specialists" className="btn-view-all poppins">
            View All
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomeUsers;
