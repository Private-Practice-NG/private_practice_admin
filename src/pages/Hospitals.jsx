import { useEffect, useState } from 'react';
import './styles/userstab.css';
import { CiSearch } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import HospitalProfileCard from './Hospitals/components/HospitalProfileCard';
import Layout from '../components/Layout';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';
import { showModal } from '../slices/modalSlice';

const Hospitals = () => {
  const [hospitalsProfilesData, setHospitalsProfilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Hospital'));
    const toastId = toast.loading('Fetching hospitals data...');

    async function fetchData() {
      try {
        const token = getAccessToken();
        const userInfo = getUserInfo();
        const userEmail = userInfo?.email;

        console.log('Access Token:', token);
        console.log('User Info:', userInfo);
        console.log('User Email:', userEmail);

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

        const hospitalsData = await axios.get(
          `http://localhost:3001/api/v1/hospitals/get-all-hospitals`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: userEmail
            }
          }
        );

        const hospitals = hospitalsData.data.response.hospitals;
        console.log('Hospitals:', hospitals);
        setHospitalsProfilesData(hospitals);
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
          <div className="users-tab sm:px-[20px]">
            <header className="flex flex-col mt-[15px] mb-[30px]">
              <div className="poppins flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl">Hospitals</h2>
              </div>
              <section className="mt-6 flex justify-between w-full items-center">
                <div
                  className="users-tab-input w-9/12"
                  style={{ backgroundColor: '#d9d9d9' }}
                >
                  <CiSearch />
                  <input
                    className="text-[14px]"
                    type="text"
                    placeholder="search hospitals"
                    style={{ backgroundColor: '#d9d9d9' }}
                  />
                </div>
                <div className="filter-button w-2/12">
                  <div className="users-tab-sort flex gap-3 sm:gap-4 justify-center items-center bg-[#d9d9d9] py-[15px] px-2 rounded-[7px]">
                    <svg
                      className="w-[14px]"
                      viewBox="0 0 31 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 2H29.2582"
                        stroke="#292D32"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4.87646 10.1273H24.382"
                        stroke="#292D32"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11.3782 18.2546H17.88"
                        stroke="#292D32"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </section>
            </header>

            <section className="flex flex-col gap-8">
              {hospitalsProfilesData.length > 0 ? (
                hospitalsProfilesData.map((each) => (
                  <HospitalProfileCard key={each._id} profileData={each} />
                ))
              ) : (
                <p>No hospital profiles available.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Hospitals;
