import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import profile from './../assets/avatar-icon.png';
import SpecialistTypeSelectionNavigationBar from '../components/SpecialistSelectionNavigationBar';
import { Rating } from 'react-simple-star-rating';
import SpecialistContent from '../components/SpecialistContent';
import { getAccessToken, getUserInfo } from '../utils/tokenUtils';
import { showModal } from '../slices/modalSlice';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Specialist = () => {
  const { specialistId } = useParams();
  const [specialistProfileData, setSpecialistProfileData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const toastId = toast.loading('Signing you in...');

    async function fetchSpecialistProfile() {
      try {
        const accessToken = getAccessToken();
        const userInfo = getUserInfo();
        console.log(userInfo);
        console.log('token:', accessToken);
        console.log('specialistId:', specialistId);

        if (!accessToken || !specialistId) {
          dispatch(
            showModal({
              title: 'Authentication Error',
              message:
                'Access token or user email is missing. Please log in again.'
            })
          );
          // setIsLoading(false);
          return;
        }

        console.log('Fetching profile for adminId: ', specialistId);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/specialists/get-specialist-profile/${specialistId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              email: userInfo.email,
              client: 'web',
              'Content-Type': 'application/json'
            }
          }
        );

        const specialistProfile = response.data.response.specialistData;
        console.log('Specialist Details', specialistProfile);
        setSpecialistProfileData(specialistProfile);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching admin profile: ', error);
        toast.error(error?.response?.data?.message || 'Something went wrong.', {
          id: toastId
        });
        setIsLoading(false);

        navigate('/log-in');
      } finally {
        setIsLoading(false);
      }
    }
    fetchSpecialistProfile();
  }, [dispatch, specialistId]);

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
          <section className="w-full rounded-xl bg-[#ECECEC] pt-7">
            <header className="w-[95%] mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex md:hidden items-center gap-2"
              >
                <MdOutlineArrowBackIosNew />{' '}
                <div className="mt-[0.5px]">Back</div>
              </button>
              <nav className="flex justify-between items-center pt-5 pl-[10px] pb-9 pr-[10px]">
                <button
                  onClick={() => navigate(-1)}
                  className="hidden md:flex items-center gap-2"
                >
                  <MdOutlineArrowBackIosNew />{' '}
                  <div className="mt-[0.5px]">Back</div>
                </button>
                <div className="flex flex-wrap items-center gap-5 md:gap-[50px]">
                  <div className="flex items-center gap-2"></div>
                  <div className="flex items-center gap-1">
                    <svg width="17" height="17" fill="#19BE3E">
                      <circle cx="8.5" cy="8.5" r="8.5" />
                    </svg>
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="15" height="15" fill="#9CA09D">
                      <circle cx="7.5" cy="7.5" r="7.5" />
                    </svg>
                    <span>Unverified</span>
                  </div>
                  {/* <button
                    className='rounded-lg border-2 border-[#10ACF5] bg-[#10ACF5] text-white py-1 px-5'
                  >
  
                  </button>
                  <button
                    className='rounded-lg border-2 border-[#10ACF5] bg-[#10ACF5] text-white py-1 px-5'
                  >
                  </button>
                  <button
                    className='rounded-lg border-2 border-[#10ACF5] bg-[#10ACF5] text-white py-1 px-5'
                  >
                  </button>
               */}
                  <Link className="text-sm">Reset Password</Link>
                </div>
              </nav>

              <section className="rounded-t-[10px] bg-[#D1D1D1] shadow-md p-[15px] md:p-[30px]">
                <div className="flex flex-col md:flex-row items-center justify-between my-[20px] md:mb-[30px] gap-6">
                  <div className="flex flex-col justify-center md:flex-row md:items-center gap-10">
                    <img
                      src={profile}
                      alt=""
                      className="w-24 h-24 md:w-48 md:h-48 rounded-full"
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="text-xl text-black font-bold">
                        {specialistProfileData.firstName}{' '}
                        {specialistProfileData.lastName}
                      </h1>
                      <p className="uppercase tracking-wide text-xs md:text-sm">
                        -------
                      </p>
                      <Rating size={'25px'} />
                      <h3>{specialistProfileData.age}</h3>
                      <div>
                        <button
                          onClick={() => {
                            console.log('View document clicked');
                          }}
                          className="bg-[#ACACAC] rounded-lg capitalize px-4 py-2 cursor-pointer"
                          aria-label="View hospital document"
                        >
                          view documents
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="rounded-lg bg-[#11A631] text-white p-3 text-center">
                      <p>------</p>
                      <h1>------</h1>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                      <div className="text-center">
                        <p>Main Balance</p>
                        <h3>--------</h3>
                      </div>
                      <div className="text-center">
                        <p>Book Balance</p>
                        <h4>-------</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <SpecialistTypeSelectionNavigationBar />
                <SpecialistContent
                  specialistProfileData={specialistProfileData}
                />
              </section>
            </header>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default Specialist;
