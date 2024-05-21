import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav } from '../../slices/usersSlice';
import { CiSearch } from 'react-icons/ci';
import '../styles/userstab.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

function JobsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobsData, setJobsData] = useState([]);
  const dispatch = useDispatch();

  // const override = {
  //   backgroundColor: 'transparent', // no background color for this spinner
  //   width: '300px!important' // width of the spinner
  // };

  useEffect(() => {
    dispatch(setNav('Jobs'));
    async function fetchData() {
      try {
        const toastId = toast.loading(
          'fetching hospital enrolment dashboard data...'
        );

        const serverResponse = await axios.get(
          'http://localhost:5000/api/jobs/get-all-jobs',
          {
            withCredentials: true
            // headers: {
            //   Authorization: `Bearer ${userAccessToken}`,
            //   Email: `${userEmail}`,
            // },
          }
        );

        if (
          serverResponse
          // &&
          // loggedInUser.data.requestStatus === 'login successful'
        ) {
          toast.success(
            'hospital enrolment dashboard data fetched successfully',
            {
              id: toastId,
              duration: 4000
            }
          );

          console.log(serverResponse.data.response);

          setJobsData(serverResponse.data.response);
          setIsLoading(false);
          // dispatch(setAdmins(adminProfiles.data));
        }
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
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
        </div>
      ) : (
        <>
          <div className="poppins font-[500] flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl ">Jobs</h2>
            <div className="text-[14px]">({jobsData.jobsCount})</div>
          </div>
          <section className="mt-6 flex justify-between w-full items-center">
            <div className="users-tab-input w-9/12">
              <CiSearch />
              <input
                className="text-[14px]"
                type="text"
                placeholder="search jobs"
                //   onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="filter-button w-2/12">
              <div className="users-tab-sort flex gap-3 sm:gap-4 justify-center items-center bg-[#d9d9d9] py-2.5 px-2 rounded-[7px]">
                <span className="poppins font-[400] sm:text-[14px] text-[10px]">
                  filter by
                </span>
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
          <section className="mt-10 flex gap-6">
            <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
              All jobs
            </button>
            <button className="py-2.5 px-4 bg-[#ececec] rounded-[7px]">
              Active jobs
            </button>
          </section>
          <section className="jobs-list-wrappper flex gap-8 flex-col mt-10">
            {jobsData.allJobs.map((job) => {
              return (
                <div
                  key={job._id}
                  className="jobs-card py-4 px-2.5 xsm:px-4 rounded-[7px] bg-[#ececec] flex justify-between items-center"
                >
                  <div className="flex flex-col gap-2 text-[12px] xsm:text-[14px]">
                    <div className="poppins font-[500]">{job.userName}</div>
                    <div className="text-[12px] xsm:text-[14px]">
                      {job.title}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-[12px] xsm:text-[14px]">
                    <div className="poppins font-[500]">Date posted</div>
                    <div className="text-[12px] xsm:text-[14px]">
                      {job.createdAt.slice(0, 10)}
                    </div>
                  </div>
                  <div>
                    <button className="py-2.5 px-3 bg-[#10acf5] rounded-[7px] text-white text-[12px] xsm:text-[14px]">
                      View job
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}

export default JobsPage;
