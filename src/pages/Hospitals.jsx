// import React from "react";
import './styles/userstab.css';
import { CiSearch } from 'react-icons/ci';
// import UserProfileCard from '../components/UserProfileCard';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { useHospitalsMutation } from '../slices/usersApiSlice';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import HospitalProfileCard from './Hospitals/components/HospitalProfileCard';
import Layout from '../components/Layout';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';

// const serverBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const Hospitals = ({ hospitalsProfilesData }) => {
  const profiles = hospitalsProfilesData || [];
  const [isLoading, setIsLoading] = useState(true);

  // const [hospitalsProfilesData, setHospitalsProfilesData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Hospital'));
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

        const hospitalsData = await axios.get(
          `http://localhost:3001/api/v1/hospitals/get-all-hospitals`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: userInfo.email
            }
          }
        );

        if (hospitalsData) {
          setIsLoading(false);

          const hospitals = hospitalsData.data.response.hospitals;
          console.log('Hospitals:', hospitals);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Something went wrong.', {
          id: toastId
        });
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <main className="w-full flex justify-center items-center">
        {isLoading ? (
          <>
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
          </>
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
                    //   onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="filter-button w-2/12">
                  <div className="users-tab-sort flex gap-3 sm:gap-4 justify-center items-center bg-[#d9d9d9] py-[15px] px-2 rounded-[7px]">
                    {/* <span className="poppins font-[400] sm:text-[14px] text-[10px]">
                    filter by
                  </span> */}
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
            {/* <section className="flex flex-col gap-8">
            <HospitalProfileCard
              hospitalsProfilesData={hospitalsProfilesData}
            />
          </section> */}
            <section className="flex flex-col gap-8">
              {/* Conditional rendering: Render only if profiles is a valid array */}
              {Array.isArray(profiles) && profiles.length > 0 ? (
                profiles.map((each) => (
                  <HospitalProfileCard key={each._id} profileData={each} />
                ))
              ) : (
                <p>No hospital profiles available.</p> // Fallback content
              )}
            </section>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Hospitals;
