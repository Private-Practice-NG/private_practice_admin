import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav } from '../../slices/usersSlice';
import { CiSearch } from 'react-icons/ci';
import { getAccessToken, getUserInfo } from '../../utils/tokenUtils';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Layout from '../../components/Layout';
import { showModal } from '../../slices/modalSlice';
import ViewApplicationModal from './components/ViewApplicationModal';

function HospitalsEnrolment() {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = (hospitalId) => {
    const foundHospital = hospitalEnrolmentDashboardData.allHospitals.find(
      (hospital) => hospital._id === hospitalId
    );
    setSelectedHospital(foundHospital);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [hospitalEnrolmentDashboardData, setHospitalEnrolmentDashboardData] =
    useState({
      allHospitalsCount: 0,
      approvedHospitalsCount: 0,
      pendingHospitalsCount: 0,
      rejectedHospitalsCount: 0,
      allHospitals: []
    });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Hospitals Enrolment'));

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

        const hospitalEnrolmentData = await axios.get(
          `http://localhost:3001/api/v1/hospitals/get-all-hospitals-data`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: `${userEmail}`
            }
          }
        );

        if (hospitalEnrolmentData) {
          setHospitalEnrolmentDashboardData(
            hospitalEnrolmentData.data.response
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }

    fetchData();
  }, [dispatch]);

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
            <div className="poppins mb-8">
              <h2 className="page-title text-2xl sm:text-3xl">
                Hospitals Enrolment
              </h2>
            </div>
            <section className="enrolment-statistics-wrapper grid grid-cols-2 md:grid-cols-4 mb-6 gap-6">
              <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#10ACF5] border-b-[6px]">
                <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
                  {hospitalEnrolmentDashboardData.allHospitalsCount}
                </div>
                <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
                  Total
                </div>
              </div>
              <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#19BE3E] border-b-[6px]">
                <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
                  {hospitalEnrolmentDashboardData.approvedHospitalsCount}
                </div>
                <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
                  Approved
                </div>
              </div>
              <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#F6AB27] border-b-[6px]">
                <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
                  {hospitalEnrolmentDashboardData.pendingHospitalsCount}
                </div>
                <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
                  Pending
                </div>
              </div>
              <div className="flex flex-col bg-[#ececec] rounded-tr-[10px] rounded-tl-[10px] border-b-[#BE1919] border-b-[6px]">
                <div className="count-wrapper font-[500] p-4 pb-2 text-3xl md:text-4xl text-center">
                  {hospitalEnrolmentDashboardData.rejectedHospitalsCount}
                </div>
                <div className="statistic-title mb-4 uppercase text-[14px] poppins font-[500] text-center">
                  Rejected
                </div>
              </div>
            </section>
            <section className="mt-[50px] md:mt-16 flex justify-between w-full items-center">
              <div className="flex items-center rounded-lg bg-[#d9d9d9] p-2 gap-2 w-9/12">
                <CiSearch className="w-8 h-5 text-[#686868]" />
                <input
                  className="bg-[#d9d9d9] text-sm text-[#8D8D8D] w-full outline-none"
                  type="text"
                  placeholder="search Application"
                />
              </div>
              <div className="filter-button w-2/12">
                <div className="users-tab-sort flex gap-3 sm:gap-4 justify-center items-center bg-[#ececec] py-[15px] px-2 rounded-[7px]">
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
                {hospitalEnrolmentDashboardData.allHospitals.map(
                  (hospitalData) => {
                    return (
                      <div
                        key={hospitalData._id}
                        className="application-card bg-[#ececec] py-4 flex justify-between poppins rounded-[7px] items-center px-3"
                      >
                        <div className="w-[22%] mr-6">
                          {hospitalData.hospitalName}
                        </div>
                        <div className="w-[28%] overflow-x-auto mr-6">
                          {hospitalData.email}
                        </div>
                        <div className="w-[20%] pl-4">
                          {new Date(hospitalData.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }
                          )}
                        </div>
                        <div className="w-[20%]">
                          <button
                            onClick={() => handleOpenModal(hospitalData._id)}
                            className="view-application-btn text-[#10ACF5]"
                          >
                            View application
                          </button>
                        </div>
                        <div className="w-[10%]">
                          <p
                            className={`status-tag text-white text-[12px] py-[4px] px-[10px] text-center rounded-full ${
                              hospitalData.activated
                                ? 'bg-[#19BE3E]'
                                : 'bg-[#F6AB27]'
                            }`}
                          >
                            {hospitalData.activated ? 'approved' : 'pending'}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </section>
            </section>
          </>
        )}
      </main>

      {isModalOpen && (
        <ViewApplicationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          hospital={selectedHospital}
        />
      )}
    </Layout>
  );
}

export default HospitalsEnrolment;
