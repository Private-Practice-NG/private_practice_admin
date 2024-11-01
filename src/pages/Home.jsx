import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeUsers from '../components/HomeUsers';
import HomeAdmins from '../components/HomeAdmins';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';
import axios from 'axios';
import toast from 'react-hot-toast';
import { showModal } from '../slices/modalSlice';
import Layout from '../components/Layout';

const Home = () => {
  console.log('Home component loaded');

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [adminHomeData, setAdminHomeData] = useState({
    hospitalsData: [],
    specialistsData: [],
    allAdmins: []
  });

  useEffect(() => {
    const toastId = toast.loading('Fetching dashboard data...');
    dispatch(setNav('Home'));

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

        const dashboardData = await axios.get(
          `http://localhost:3001/api/v1/admin/get-admin-dashboard-home-data`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: userEmail
            }
          }
        );

        if (dashboardData?.data?.response) {
          toast.success('Dashboard data fetched successfully', {
            id: toastId,
            duration: 4000
          });
          setAdminHomeData(dashboardData.data.response);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching admin profile: ', error);
        toast.error(error?.response?.data?.message || 'Something went wrong.', {
          id: toastId
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center relative min-h-[150px]">
        {isLoading ? (
          <div className="spinner flex justify-center items-center">
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
          <section className="flex flex-col w-full gap-[30px]">
            <HomeUsers adminHomeData={adminHomeData} />
            <HomeAdmins home={true} adminHomeData={adminHomeData} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Home;
