// import React from "react";
import './styles/userstab.css';
import { CiSearch } from 'react-icons/ci';
import UserProfileCard from '../components/UserProfileCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpecialistsMutation } from '../slices/usersApiSlice';
import { setSpecialists, setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
const Specialists = () => {
  const [searchData, setSearchData] = useState(null);
  const dispatch = useDispatch();
  const [users, { isLoading }] = useSpecialistsMutation();

  useEffect(() => {
    dispatch(setNav('Specialist'));
    async function fetchData() {
      try {
        const res = await users().unwrap();
        dispatch(setSpecialists(res.data));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  const { specialists } = useSelector((state) => state.users);

  // Function to perform the search
  function search(query) {
    // Convert the query to lowercase for a case-insensitive search
    const searchTerm = query.toLowerCase();

    // Filter the specialists array based on the search term
    const results = specialists.filter(
      (item) => item.firstName.toLowerCase().includes(searchTerm)
      //|| // search in 'firstname' property
      //item.lastName.toLowerCase().includes(searchTerm) // search in 'lastname' property
    );

    return results;
  }

  //function to handle the search query
  const handleSearch = (searchQuery) => {
    const searchResults = search(searchQuery);
    setSearchData(searchResults);
  };
  return (
    <div className="users-tab px-3 sm:px-4">
      <header className="users-tab-header">
        <h1 className="poppins font-[500] text-[14px] sm:text-[16px]">
          Specialists
        </h1>
        <div className="users-tab-input w-[40%]">
          <CiSearch />
          <input
            className="text-[14px]"
            type="text"
            placeholder="search hospital"
            onChange={(e) => handleSearch(e.target.value)}
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
          <p className="poppins font-[500] text-[14px] sm:text-[16px]">Sort</p>
        </div>
      </header>
      <section className="users-tab-profiles">
        <>
          {isLoading ? (
            <>
              <div className="spinner-users">
                <FadeLoader
                  color={'#10ACF5'}
                  loading={isLoading}
                  // cssOverride={override}
                  size={300}
                  height={50}
                  width={5}
                  radius={10}
                  margin={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </>
          ) : (
            <>
              {searchData
                ? searchData?.map((user, index) => (
                    <UserProfileCard
                      user="specialist"
                      specialist={user}
                      key={index}
                    />
                  ))
                : specialists?.map((user, index) => (
                    <UserProfileCard
                      user="specialist"
                      specialist={user}
                      key={index}
                    />
                  ))}
            </>
          )}
        </>
      </section>
    </div>
  );
};

export default Specialists;
