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

// const override = {
//   backgroundColor: 'transparent', // no background color for this spinner
//   width: '300px!important' // width of the spinner
// };
const serverBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const Hospitals = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [hospitalsProfilesData, setHospitalsProfilesData] = useState([]);
  const dispatch = useDispatch();
  console.log('serverBaseUrl', serverBaseUrl);

  // const [users, { isLoading }] = useHospitalsMutation();
  useEffect(() => {
    dispatch(setNav('Hospital'));
    // async function fetchData() {
    //   try {
    //     const res = await users().unwrap();
    //     dispatch(setHospitals(res.data));
    //   } catch (error) {
    //     console.log(error?.data?.message || 'something went wrong');
    //   }
    // }
    // fetchData();

    async function fetchData() {
      try {
        const toastId = toast.loading('fetching hospitals data...');

        const hospitalsData = await axios.get(
          `${serverBaseUrl}/api/admins/hospitals`,
          {
            withCredentials: true
            // headers: {
            //   Authorization: `Bearer ${userAccessToken}`,
            //   Email: `${userEmail}`,
            // },
          }
        );

        if (
          hospitalsData
          // &&
          // loggedInUser.data.requestStatus === 'login successful'
        ) {
          toast.success('hospitals data fetched successfully', {
            id: toastId,
            duration: 4000
          });

          // console.log(hospitalsData.data.response);

          setHospitalsProfilesData(hospitalsData.data.response);
          setIsLoading(false);

          console.log(hospitalsData.data.response);
          // dispatch(setAdmins(adminProfiles.data));
        }
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  // const { hospitals } = useSelector((state) => state.users);

  // Function to perform the search
  // function search(query) {
  //   // Convert the query to lowercase for a case-insensitive search
  //   const searchTerm = query.toLowerCase();

  //   // Filter the hospitals array based on the search term
  //   const results = hospitals.filter(
  //     (item) => item.hospitalName.toLowerCase().includes(searchTerm) // search in 'hospitalname' property
  //   );

  //   return results;
  // }

  //function to handle the search query
  // const handleSearch = (searchQuery) => {
  //   const searchResults = search(searchQuery);
  //   setSearchData(searchResults);
  // };

  return (
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
        <div className="users-tab">
          <header className="users-tab-header">
            <h1 className="poppins font-[500] text-[14px] sm:text-[16px]">
              Hospitals
            </h1>
            <div className="users-tab-input w-[40%]">
              <CiSearch />
              <input
                className="text-[14px]"
                type="text"
                placeholder="search hospitals"
                // onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="users-tab-sort">
              <svg
                className="w-[20px]"
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
              <span className="poppins font-[500] text-[14px] sm:text-[16px]">
                Sort
              </span>
            </div>
          </header>
          {/* <section className="flex flex-col gap-8">
            <HospitalProfileCard
              hospitalsProfilesData={hospitalsProfilesData}
            />
          </section> */}
          <section className="flex flex-col gap-8">
            {hospitalsProfilesData.hospitalsProfiles.map((each) => {
              return <HospitalProfileCard key={each._id} profileData={each} />;
            })}
          </section>
        </div>
      )}
    </main>
  );
};

export default Hospitals;
