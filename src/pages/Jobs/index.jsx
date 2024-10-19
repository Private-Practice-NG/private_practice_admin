import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav } from '../../slices/usersSlice';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import toast from 'react-hot-toast';
import { showModal } from '../../slices/modalSlice';
import { getAccessToken, getUserInfo } from '../../utils/tokenUtils';
import { FadeLoader } from 'react-spinners';
import Layout from '../../components/Layout';

function JobsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobsData, setJobsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Jobs'));
    const toastId = toast.loading('Fetching jobs data...');

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

        const serverResponse = await axios.get(
          `http://localhost:3001/api/v1/jobs/get-all-jobs`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: `${userEmail}`
            }
          }
        );

        if (serverResponse) {
          toast.success('Jobs data fetched successfully', {
            id: toastId,
            duration: 4000
          });
          const jobsArray = serverResponse.data.response.jobs.allJobs.allJobs;
          setJobsData(jobsArray);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.data?.message || error.error);
        toast.error('Failed to fetch jobs data. Please try again.', {
          id: toastId,
          duration: 4000
        });
        setIsLoading(false);
      }
    }

    fetchData();
  }, [dispatch]);

  const filteredJobs = jobsData
    ? jobsData.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <main>
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
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
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 poppins">
              <h2 className="text-2xl">Jobs</h2>
              <div className="text-sm">({filteredJobs.length})</div>
            </div>
            <section className="mt-6 flex justify-between w-full items-center">
              <div className="flex items-center w-9/12 rounded-lg bg-[#ececec] p-2 gap-2">
                <CiSearch />
                <input
                  className="text-sm bg-transparent outline-none w-full"
                  type="text"
                  placeholder="search jobs"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-2/12">
                <div className="flex gap-3 sm:gap-4 justify-center items-center bg-[#ececec] py-4 px-2 rounded-lg cursor-pointer">
                  <svg
                    className="w-3.5"
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
            <section className="mt-6 sm:mt-8 flex gap-6">
              <button className="py-2.5 px-4 bg-[#10acf5] rounded-lg text-white">
                All jobs
              </button>
              <button className="py-2.5 px-4 bg-[#ececec] rounded-lg">
                Active jobs
              </button>
            </section>
            <section className="jobs-list-wrapper flex flex-col gap-8 mt-6 sm:mt-8">
              {filteredJobs.length === 0 ? (
                <div>No jobs available at the moment.</div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="jobs-card py-4 px-3 xsm:px-4 rounded-lg bg-[#ececec] flex gap-8 items-center"
                  >
                    <div className="flex flex-col gap-2 text-xs xsm:text-sm w-6/12">
                      <div className="poppins font-medium">{job.userName}</div>
                      <div className="text-xs xsm:text-sm">{job.title}</div>
                    </div>
                    <div className="flex flex-col gap-2 text-xs xsm:text-sm w-4/12">
                      <div className="poppins font-medium">Date posted</div>
                      <div className="text-xs xsm:text-sm">
                        {job.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <button className="py-2.5 px-3 bg-[#10acf5] rounded-lg text-white text-xs xsm:text-sm w-2/12">
                      View job
                    </button>
                  </div>
                ))
              )}
            </section>
          </>
        )}
      </main>
    </Layout>
  );
}

export default JobsPage;
