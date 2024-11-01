import AdminProfileCard from '../pages/Admins/components/AdminProfileCard';
import { Link } from 'react-router-dom';

const HomeAdmins = ({
  adminHomeData = { dashboardData: { allAdmins: [] } }
}) => {
  console.log('Admin Home Data:', adminHomeData);

  const adminProfilesData =
    adminHomeData?.dashboardData?.allAdmins?.slice(0, 5) || [];

  return (
    <div className="bg-[#ECECEC] w-full rounded-lg px-3 py-6 pb-11">
      <header className="flex justify-between items-center mb-[25px]">
        <h2 className="home-admins-title poppins font-[500] text-[14px] sm:text-[16px]">
          Admins
        </h2>
        <Link
          to="/admins/create-admin-account"
          className="px-6 py-3 rounded-[7px] bg-[#19BE3E] text-white poppins text-[12px] sm:text-[14px]"
        >
          Add Admin
        </Link>
      </header>
      <section className="flex flex-col gap-8">
        {adminProfilesData.length > 0 ? (
          adminProfilesData
            .slice(0, 5)
            .map((each) => (
              <AdminProfileCard key={each._id} profileData={each} />
            ))
        ) : (
          <p>No admins available</p>
        )}
      </section>
    </div>
  );
};

export default HomeAdmins;
