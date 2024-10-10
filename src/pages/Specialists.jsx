import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import axios from 'axios';
import toast from 'react-hot-toast';
import SpecialistProfileCard from './Specialists/components/SpecialistProfileCard';
import Layout from '../components/Layout';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';
import { showModal } from '../slices/modalSlice';

const Specialists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [specialistsProfilesData, setSpecialistProfilesData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Specialist'));
    const toastId = toast.loading('Fetching specialists data...');

    const fetchData = async () => {
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

        const specialistsProfiles = await axios.get(
          `http://localhost:3001/api/v1/specialists/get-all-specialists`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: userEmail
            }
          }
        );

        const specialists = specialistsProfiles.data.response.specialistsData;
        console.log('specialists', specialists);

        setSpecialistProfilesData(specialists);
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
    };

    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <main className="w-full flex justify-center items-center">
        {isLoading ? (
          <div className="flex justify-center items-center pt-24">
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
          <div className="w-full px-3 sm:px-5">
            <header className="flex flex-col mt-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl">Specialists</h2>
              </div>
              <section className="mt-6 mb-10 flex justify-between items-center">
                <div className="flex items-center gap-2 w-9/12 bg-gray-300 p-2 rounded">
                  <CiSearch className="text-lg" />
                  <input
                    className="bg-gray-300 text-sm outline-none w-full"
                    type="text"
                    placeholder="Search specialists"
                  />
                </div>
                <div className="w-2/12">
                  <div className="flex gap-3 justify-center items-center bg-gray-300 py-3 px-2 rounded">
                    <svg
                      className="w-4"
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
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialistsProfilesData.length > 0 ? (
                specialistsProfilesData.map((each) => (
                  <SpecialistProfileCard
                    key={each._id}
                    specialistProfile={each}
                  />
                ))
              ) : (
                <p>No specialist profiles available.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Specialists;
