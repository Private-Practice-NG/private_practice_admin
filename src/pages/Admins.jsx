import { useState } from 'react';
// import HomeAdmins from "../components/HomeAdmins";
import axios from 'axios';
// import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
// import { useAdminsMutation } from '../slices/usersApiSlice';
// import { setAdmins } from "../slices/usersSlice";
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import AdminProfileCard from './Admins/components/AdminProfileCard';
import Layout from '../components/Layout';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';

const Admins = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [adminProfilesData, setAdminProfilesData] = useState([]);
  // const isLoading = true;

  useEffect(() => {
    dispatch(setNav('Admin'));
    const toastId = toast.loading('signin you in...');

    async function fetchData() {
      try {
        const token = getAccessToken();
        const userInfo = getUserInfo();
        const userEmail = userInfo?.email;

        console.log('Access Token:', token);
        console.log('User Info:', userInfo);
        console.log('User Email:', userEmail);

        if (!token || !userEmail) {
          console.warn('Missing token or user email');
          setIsLoading(false);
          return;
        }

        const adminProfiles = await axios.get(
          `http://localhost:3001/api/v1/admin/get-all-admins`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: userEmail
            }
          }
        );
        const adminUsers = adminProfiles.data.response.allAdminData;
        console.log('specialists', adminUsers);
        setAdminProfilesData(adminUsers);
        setIsLoading(false);
        toast.dismiss(toastId);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Something went wrong.', {
          id: toastId
        });
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // const { admins } = useSelector((state) => state.users);
  return (
    <Layout>
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
            <header className="flex justify-between items-center mb-[30px] mt-[10px]">
              <h2 className="home-admins-title poppins text-xl sm:text-2xl">
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
                adminProfilesData.map((each) => (
                  <AdminProfileCard key={each._id} profileData={each} />
                ))
              ) : (
                <p>No admin profiles available.</p>
              )}
            </section>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default Admins;
