import { useState } from 'react';
// import HomeAdmins from "../components/HomeAdmins";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { useAdminsMutation } from '../slices/usersApiSlice';
// import { setAdmins } from "../slices/usersSlice";
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import AdminProfileCard from './Admins/components/AdminProfileCard';

// const override = {
//   backgroundColor: 'transparent', // no background color for this spinner
//   width: '300px!important' // width of the spinner
// };

const Admins = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [adminProfilesData, setAdminProfilesData] = useState([]);
  // const isLoading = true;

  useEffect(() => {
    dispatch(setNav('Admin'));
    async function fetchData() {
      try {
        const toastId = toast.loading('fetching admin profiles...');

        const adminProfiles = await axios.get(
          'http://localhost:5000/api/admins/admins',
          {
            withCredentials: true
            // headers: {
            //   Authorization: `Bearer ${userAccessToken}`,
            //   Email: `${userEmail}`,
            // },
          }
        );

        if (
          adminProfiles
          // &&
          // loggedInUser.data.requestStatus === 'login successful'
        ) {
          toast.success('admin profiles fetched successfully', {
            id: toastId,
            duration: 4000
          });

          setAdminProfilesData(adminProfiles.data.response.adminUsers);
          setIsLoading(false);
          // dispatch(setAdmins(adminProfiles.data));
        }
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  // const { admins } = useSelector((state) => state.users);
  return (
    <main className="w-full flex justify-center items-center">
      {isLoading ? (
        <div className="spinner flex justify-center items-center pt-[100px]">
          <FadeLoader
            color={'#10ACF5'}
            loading={true}
            // cssOverride={override}
            // size={300}
            height={40}
            width={2}
            radius={10}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <section className="bg-[#ececec] w-full rounded-[7px] px-3 py-[16px] sm:px-[20px] pb-[60px]">
          <header className="flex justify-between items-center mb-[25px]">
            <h1 className="home-admins-title poppins font-[500] text-[14px] sm:text-[16px]">
              Admins
            </h1>
            <Link
              to="/admins/create-admin-account"
              className="px-6 py-3 rounded-[7px] bg-[#19BE3E] text-white poppins text-[12px] sm:text-[14px]"
            >
              Add Admin
            </Link>
          </header>
          <section className="flex flex-col gap-8">
            {adminProfilesData.map((each) => {
              return <AdminProfileCard key={each._id} profileData={each} />;
            })}
          </section>
        </section>
      )}
    </main>
  );
};

export default Admins;
