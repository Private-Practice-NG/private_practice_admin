import React from "react";
import "./styles/userstab.css";
import { CiSearch } from "react-icons/ci";
import UserProfileCard from "../components/UserProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHospitalsMutation } from "../slices/usersApiSlice";
import { setHospitals } from "../slices/usersSlice";
const Hospitals = () => {
  const [searchData, setSearchData] = useState(null);
  const dispatch = useDispatch();
  const [users, { isLoading }] = useHospitalsMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await users().unwrap();
        dispatch(setHospitals(res.data));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  const { hospitals } = useSelector((state) => state.users);

  // Function to perform the search
  function search(query) {
    // Convert the query to lowercase for a case-insensitive search
    const searchTerm = query.toLowerCase();

    // Filter the hospitals array based on the search term
    const results = hospitals.filter(
      (item) => item.hospitalName.toLowerCase().includes(searchTerm) // search in 'hospitalname' property
    );

    return results;
  }

  //function to handle the search query
  const handleSearch = (searchQuery) => {
    const searchResults = search(searchQuery);
    setSearchData(searchResults);
  };
  return (
    <div className="users-tab">
      <header className="users-tab-header">
        <h1>Hospitals</h1>
        <div className="users-tab-input">
          <CiSearch />
          <input
            type="text"
            placeholder="Search Hospital"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="users-tab-sort">
          <svg
            width="31"
            height="20"
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
          <p>Sort</p>
        </div>
      </header>
      <section className="users-tab-profiles">
        {searchData
          ? searchData?.map((user, index) => (
              <UserProfileCard
                user="hospital"
                hospital={user}
                key={index}
              />
            ))
          : hospitals?.map((user, index) => (
              <UserProfileCard
                user="hospital"
                hospital={user}
                key={index}
              />
            ))}
      </section>
    </div>
  );
};

export default Hospitals;
