import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import FadeLoader from 'react-spinners/FadeLoader';
import AdminProfileCard from './Admins/components/AdminProfileCard';
import Layout from '../components/Layout';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';
import { setNav } from '../slices/usersSlice';
import { showModal } from '../slices/modalSlice';

const Admins = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [adminProfilesData, setAdminProfilesData] = useState([]);

  useEffect(() => {
    dispatch(setNav('Admin'));
    const toastId = toast.loading('Signing you in...');

    async function fetchData() {
      try {
        const token = getAccessToken();
        const userInfo = getUserInfo();
        const userEmail = userInfo?.email;

        if (!token || !userEmail) {
          dispatch(
            showModal({
              title: 'Authentication Error',
              message:
                'Access token or user email is missing. Please log in again.'
            })
          );
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
        setAdminProfilesData(adminUsers);
        setIsLoading(false);
        toast.dismiss(toastId);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          'Something went wrong. Please try again.';
        dispatch(
          showModal({
            title: 'Error',
            message: errorMessage
          })
        );
        setIsLoading(false);
        toast.dismiss(toastId);
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <main className="w-full flex justify-center items-center">
        {isLoading ? (
          <div className="spinner flex justify-center items-center pt-[100px]">
            <FadeLoader
              color={'#10ACF5'}
              loading={true}
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
