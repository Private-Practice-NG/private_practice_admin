import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav } from '../../slices/usersSlice';
import { CiSearch } from 'react-icons/ci';

function HospitalsEnrolment() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Hospitals Enrolment'));
  });

  return (
    <>
      <div className="poppins mb-8">
        <h2 className="page-title text-2xl sm:text-3xl font-[500]">
          Hospitals Enrolment
        </h2>
        {/* <div className="text-[14px]">(1250)</div> */}
      </div>
      <section className="enrolment-statistics-wrapper grid grid-cols-2 md:grid-cols-4 mb-6 gap-6">
        <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#10ACF5] border-b-[6px]">
          <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
            1000
          </div>
          <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
            Total
          </div>
        </div>
        <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#19BE3E] border-b-[6px]">
          <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
            1000
          </div>
          <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
            Approved
          </div>
        </div>
        <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#F6AB27] border-b-[6px]">
          <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
            1000
          </div>
          <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
            Pending
          </div>
        </div>
        <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#BE1919] border-b-[6px]">
          <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
            1000
          </div>
          <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
            Rejected
          </div>
        </div>
      </section>
      <section className="mt-[50px] md:mt-16 flex justify-between w-full items-center">
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
      <p className="text-[#10acf5] mt-6 mb-4 underline pt-6 sm:pt-10 text-[11px] lg:hidden">
        * scroll horizontally to see all hospital details
      </p>
      <section className="applications-table-wrapper overflow-x-auto mt-2 min-h-[200px] pb-10 lg:pt-10">
        <section className="applications-table-header flex justify-between poppins min-w-[1000px] lg:min-w-[100%] font-[600] text-[14px]">
          <div className="w-[22%] px-3 mr-6">Hospital name</div>
          <div className="w-[28%] mr-6">Email address</div>
          <div className="w-[20%]">Date submitted</div>
          <div className="w-[20%]">View application</div>
          <div className="w-[10%]">Status</div>
        </section>
        <section className="applications mt-4 min-w-[1000px] lg:min-w-[100%] flex flex-col gap-y-4">
          <div className="application-card bg-[#ececec] py-4 flex justify-between poppins rounded-[7px] items-center">
            <div className="w-[22%] px-3 mr-6">Graceland Hospitals</div>
            <div className="w-[28%] overflow-x-auto mr-6">
              gracelandhospitals@gmail.com
            </div>
            <div className="w-[20%]">25 October 2023</div>
            <div className="w-[20%]">
              <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
                View application
              </button>
            </div>
            <div className="w-[10%] pr-3">Pending</div>
          </div>
          <div className="application-card bg-[#ececec] py-4 flex justify-between poppins rounded-[7px] items-center">
            <div className="w-[22%] px-3 mr-6">Graceland Hospitals</div>
            <div className="w-[28%] overflow-x-auto mr-6">
              gracelandhospitals@gmail.com
            </div>
            <div className="w-[20%]">25 October 2023</div>
            <div className="w-[20%]">
              <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
                View application
              </button>
            </div>
            <div className="w-[10%] pr-3">Pending</div>
          </div>
          <div className="application-card bg-[#ececec] py-4 flex justify-between poppins rounded-[7px] items-center">
            <div className="w-[22%] px-3 mr-6">Graceland Hospitals</div>
            <div className="w-[28%] overflow-x-auto mr-6">
              gracelandhospitals@gmail.com
            </div>
            <div className="w-[20%]">25 October 2023</div>
            <div className="w-[20%]">
              <button className="py-2.5 px-4 bg-[#10acf5] rounded-[7px] text-white">
                View application
              </button>
            </div>
            <div className="w-[10%] pr-3">Pending</div>
          </div>
        </section>
      </section>
    </>
  );
}

export default HospitalsEnrolment;
