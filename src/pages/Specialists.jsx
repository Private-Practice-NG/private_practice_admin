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
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

const Specialists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [specialistsProfilesData, setSpecialistProfilesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    verified: false,
    notVerified: false,
    dateRegistered: '',
    location: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav('Specialist'));
    const toastId = toast.loading('Fetching specialists data...');

    const fetchData = async () => {
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
        setSpecialistProfilesData(specialists);
        setFilteredData(specialists);
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

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => {
      let updatedFilters = {
        ...prevFilters,
        [name]: type === 'checkbox' ? checked : value
      };

      if (name === 'verified' && checked) {
        updatedFilters.notVerified = false;
      } else if (name === 'notVerified' && checked) {
        updatedFilters.verified = false;
      }

      if (name === 'location') {
        updatedFilters.location = checked ? value : '';
      }

      return updatedFilters;
    });
  };

  useEffect(() => {
    let filtered = specialistsProfilesData;

    if (filters.verified || filters.notVerified) {
      filtered = filtered.filter((specialist) => {
        if (filters.verified && specialist.verified.profile) return true;
        if (filters.notVerified && !specialist.verified.profile) return true;
        return false;
      });
    }

    if (filters.dateRegistered) {
      filtered = filtered.filter(
        (specialist) =>
          new Date(specialist.createdAt) >= new Date(filters.dateRegistered)
      );
    }

    // Apply Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (specialist) =>
          specialist.state?.toLowerCase() === filters.location.toLowerCase()
      );
    }

    setFilteredData(filtered);
  }, [filters, specialistsProfilesData]);

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
                <div className="flex items-center gap-2 w-3/5 bg-gray-300 p-2 rounded">
                  <input
                    className="bg-gray-300 text-sm outline-none w-full"
                    type="text"
                    placeholder="Search specialists"
                  />
                </div>
                <div className="w-1/3">
                  <Popover>
                    <PopoverButton
                      className="flex gap-3 justify-center items-center bg-gray-300 py-3 w-full rounded"
                      onClick={() => setIsFilterOpen(true)}
                    >
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
                    </PopoverButton>

                    <PopoverPanel className="absolute z-50 text-white bg-[#10ACF5] shadow-lg p-4 mt-2 rounded  flex  gap-4 overflow-hidden">
                      {/* Filter by Verification Status */}
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-medium">
                          Verification Status
                        </p>
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id="verified"
                            name="verified"
                            checked={filters.verified}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                verified: !filters.verified,
                                notVerified: false
                              })
                            }
                          />
                          <label htmlFor="verified" className="text-xs">
                            Verified
                          </label>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id="notVerified"
                            name="notVerified"
                            checked={filters.notVerified}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                notVerified: !filters.notVerified,
                                verified: false
                              })
                            }
                          />
                          <label htmlFor="notVerified" className="text-xs">
                            Not Verified
                          </label>
                        </div>
                      </div>

                      {/* Filter by Date Registered */}
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-medium">
                          Date Registered
                        </p>
                        <input
                          type="date"
                          name="dateRegistered"
                          value={filters.dateRegistered}
                          onChange={handleFilterChange}
                          className="border w-24 border-gray-300 text-black rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Filter by Location (State) */}
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-medium">
                          Location (State)
                        </p>

                        {/* Lagos Checkbox */}
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id="lagos"
                            name="location"
                            checked={filters.location === 'Lagos'}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                location:
                                  filters.location === 'Lagos' ? '' : 'Lagos'
                              })
                            }
                          />
                          <label htmlFor="lagos" className="text-xs">
                            Lagos
                          </label>
                        </div>

                        {/* Abuja Checkbox */}
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id="abuja"
                            name="location"
                            checked={filters.location === 'Abuja'}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                location:
                                  filters.location === 'Abuja' ? '' : 'Abuja'
                              })
                            }
                          />
                          <label htmlFor="abuja" className="text-xs">
                            Abuja
                          </label>
                        </div>

                        {/* Oyo Checkbox */}
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id="oyo"
                            name="location"
                            checked={filters.location === 'Oyo'}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                location:
                                  filters.location === 'Oyo' ? '' : 'Oyo'
                              })
                            }
                          />
                          <label htmlFor="oyo" className="text-xs">
                            Oyo
                          </label>
                        </div>
                      </div>
                    </PopoverPanel>
                  </Popover>
                </div>
              </section>
            </header>
            {/* Overlay */}
            {isFilterOpen && (
              <div
                className="fixed inset-0 bg-white bg-opacity-70 z-40"
                onClick={() => setIsFilterOpen(false)}
              ></div>
            )}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredData.length > 0 ? (
                filteredData.map((each) => (
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
