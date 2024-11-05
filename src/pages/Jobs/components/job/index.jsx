// import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import mockAvatar from '../../../../assets/img-5.png';
import JobProgress from './components/JobProgress';
import { HiStar } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getAccessToken, getUserInfo } from '../../../../utils/tokenUtils';
import { showModal } from '../../../../slices/modalSlice';
import { Link } from 'react-router-dom';

const SingleJob = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const toastId = toast.loading('Fetching job data...');

    const fetchJobProfile = async () => {
      try {
        const accessToken = getAccessToken();
        const userInfo = getUserInfo();

        if (!accessToken || !jobId) {
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

        console.log('Fetching profile for adminId: ', jobId);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/jobs/get-job/${jobId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              email: userInfo.email,
              'Content-Type': 'application/json'
            }
          }
        );

        const jobData = response.data.response.job;
        console.log('Hospitals:', jobData);
        setJobDetails(jobData);
        setIsLoading(false);
        toast.dismiss(toastId);
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
    };
    fetchJobProfile();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Layout>
        <div className="w-full flex justify-center items-center]">
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
      </Layout>
    );
  }

  if (!jobDetails.length) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold">No Job Details Available</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {jobDetails.map((job) => (
        <main key={job._id} className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/4 flex flex-col justify-center">
            <Link to={`/jobs`}>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4"
              >
                <MdOutlineArrowBackIosNew />{' '}
                <div className="mt-[0.5px]">Back</div>
              </button>
            </Link>
            <div className="mt-10 p-4">
              <h2 className="text-black text-base md:text-3xl font-bold mb-3">
                {job.title}
              </h2>
              <p className="tracking-wider text-sm md:text-lg font-normal mb-7">
                {job.description}
              </p>
            </div>
            <div className="border-y p-4 flex flex-col items-start md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-center gap-2 mb-2 text-sm md:text-base">
                <span className="block capitalize">fixed price: </span>
                <span className="block font-bold">-------</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                <span className="block capitalize">
                  {job.specialistCategory}
                </span>
                <span className="block font-bold">----</span>
              </div>
            </div>
            <div className="border-b p-4">
              <h2 className="text-black text-lg font-bold">-------</h2>
              <span className="font-normal text-xs md:text-sm">--------</span>
            </div>
            <div className="border-b p-4 w-full">
              <h2 className="text-black text-lg font-bold">Job Progression</h2>
              <JobProgress />
            </div>
            <div className="p-4 w-full border-b mb-5">
              <h2 className="text-black text-lg font-bold mb-5">
                Specialist Chosen:
              </h2>
              <div className="bg-[#9F9F9F] opacity-80 flex justify-between p-4 shadow-md rounded-lg mb-7">
                <div className="flex items-center gap-4">
                  <img
                    src={mockAvatar}
                    alt="profile-image"
                    className="w-[50px]"
                  />
                  <div>
                    <span className="font-bold text-sm md:text-lg block">
                      {job.userName}
                    </span>
                    <span className="bock text-sm">----</span>
                  </div>
                </div>
                <div className="bg-[#10ACF5] px-2 font-bold text-xs md:text-sm md:w-1/5 flex items-center justify-center rounded-md hover:underline">
                  <button className="cursor-pointer">View Profile</button>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm md:text-lg mb-5">
                  <span className="block capitalize font-bold">
                    Hospital Ratings:{' '}
                  </span>
                  <span className="block">-----</span>
                </div>
                <div className="flex items-center gap-2 pb-10">
                  {Array.from({ length: 5 }, (_, index) => (
                    <HiStar key={index} className="text-[#F6AB27]" size={25} />
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b p-4 w-full mb-5">
              <div className="flex items-center gap-2 text-sm md:text-lg mb-5">
                <span className="block capitalize font-bold">
                  Hospital Ratings:{' '}
                </span>
                <span className="block">------</span>
              </div>
              <div className="flex items-center gap-2 pb-10">
                <HiStar className="text-[#F6AB27]" size={25} />
                <HiStar className="text-[#F6AB27]" size={25} />
                <HiStar className="text-[#F6AB27]" size={25} />
                <HiStar className="text-[#F6AB27]" size={25} />
                <HiStar className="text-[#F6AB27]" size={25} />
              </div>
              <span className="block text-sm">--------</span>
            </div>
            <div className="shadow-md px-4 rounded-md mb-10">
              <h2 className="text-black text-lg font-bold mb-5">Applicants</h2>
              <div className="bg-[#9F9F9F] opacity-80 flex justify-between p-4 shadow-md rounded-lg mb-7">
                <div className="flex items-center gap-4">
                  <img
                    src={mockAvatar}
                    alt="profile-image"
                    className="w-[50px]"
                  />
                  <div>
                    <span className="font-bold text-sm md:text-lg block">
                      {job.userName}
                    </span>
                    <span className="bock text-sm">-----</span>
                  </div>
                </div>
                <div className="bg-[#10ACF5] px-2 font-bold text-xs md:text-sm md:w-1/5 flex items-center justify-center rounded-md hover:underline">
                  <button className="cursor-pointer">View Profile</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/4"></div>
        </main>
      ))}
    </Layout>
  );
};

export default SingleJob;
