import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav } from '../../slices/usersSlice';
import { CiSearch } from 'react-icons/ci';
import '../styles/userstab.css';

function JobsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Jobs'));
  });

  return (
    <>
      <div className="poppins font-[500] flex items-center gap-2">
        <h2 className="text-2xl sm:text-3xl ">Jobs</h2>
        <div className="text-[14px]">(1250)</div>
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
        <div className="jobs-card py-4 px-4 rounded-[7px] bg-[#ececec] flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="poppins font-[500] xsm:text-[14px] sm:text-xl">
              Kingscare Hospital
            </div>
            <div>Dentist needed</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="poppins font-[500]">Date posted</div>
            <div>25 October 2025</div>
          </div>
          <div>
            <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
              View job
            </button>
          </div>
        </div>
        <div className="jobs-card py-4 px-4 rounded-[7px] bg-[#ececec] flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="poppins font-[500] xsm:text-[14px] sm:text-xl">
              Kingscare Hospital
            </div>
            <div>Dentist needed</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="poppins font-[500]">Date posted</div>
            <div>25 October 2025</div>
          </div>
          <div>
            <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
              View job
            </button>
          </div>
        </div>
        <div className="jobs-card py-4 px-4 rounded-[7px] bg-[#ececec] flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="poppins font-[500] xsm:text-[14px] sm:text-xl">
              Kingscare Hospital
            </div>
            <div>Dentist needed</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="poppins font-[500]">Date posted</div>
            <div>25 October 2025</div>
          </div>
          <div>
            <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
              View job
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobsPage;
