// import React from "react";
import './styles/userstab.css';
import { CiSearch } from 'react-icons/ci';
// import UserProfileCard from '../components/UserProfileCard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useSpecialistsMutation } from '../slices/usersApiSlice';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpecialistProfileCard from './Specialists/components/SpecialistProfileCard';

// const override = {
//   backgroundColor: 'transparent', // no background color for this spinner
//   width: '300px!important' // width of the spinner
// };

const Specialists = () => {
  // const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [specialistsProfilesData, setSpecialistProfilesData] = useState([]);
  const dispatch = useDispatch();
  // const [users, { isLoading }] = useSpecialistsMutation();

  // useEffect(() => {
  //   dispatch(setNav('Specialist'));
  //   async function fetchData() {
  //     try {
  //       const res = await users().unwrap();
  //       dispatch(setSpecialists(res.data));
  //     } catch (error) {
  //       console.log(error?.data?.message || error.error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    dispatch(setNav('Specialist'));
    async function fetchData() {
      try {
        const toastId = toast.loading('fetching specialists profiles...');

        const specialistsProfiles = await axios.get(
          'http://localhost:5000/api/admins/specialists',
          {
            withCredentials: true
            // headers: {
            //   Authorization: `Bearer ${userAccessToken}`,
            //   Email: `${userEmail}`,
            // },
          }
        );

        if (
          specialistsProfiles
          // &&
          // loggedInUser.data.requestStatus === 'login successful'
        ) {
          toast.success('specialists profiles fetched successfully', {
            id: toastId,
            duration: 4000
          });

          console.log(specialistsProfilesData);

          setSpecialistProfilesData(specialistsProfiles.data.response);
          setIsLoading(false);
          // dispatch(setAdmins(adminProfiles.data));
        }
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  // const { specialists } = useSelector((state) => state.users);

  // Function to perform the search
  // function search(query) {
  //   // Convert the query to lowercase for a case-insensitive search
  //   const searchTerm = query.toLowerCase();

  //   // Filter the specialists array based on the search term
  //   const results = specialists.filter(
  //     (item) => item.firstName.toLowerCase().includes(searchTerm)
  //     //|| // search in 'firstname' property
  //     //item.lastName.toLowerCase().includes(searchTerm) // search in 'lastname' property
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
        <div className="users-tab px-3 sm:px-[20px]">
          <header className="users-tab-header px-3 sm:px-[20px]">
            <h1 className="poppins font-[500] text-[14px] sm:text-[16px]">
              Specialists
            </h1>
            <div className="users-tab-input w-[40%]">
              <CiSearch />
              <input
                className="text-[14px]"
                type="text"
                placeholder="search specialists"
                //  onChange={(e) => handleSearch(e.target.value)}
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
              <p className="poppins font-[500] text-[14px] sm:text-[16px]">
                Sort
              </p>
            </div>
          </header>
          <section className="specialists-profiles-wrapper px-3 sm:px-[20px] grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-6 mt-[50px]">
            {specialistsProfilesData.map((specialistProfile) => {
              return (
                <SpecialistProfileCard
                  key={specialistProfile._id}
                  specialistProfile={specialistProfile}
                />
              );
            })}
          </section>
        </div>
      )}
    </main>
  );
};

export default Specialists;
