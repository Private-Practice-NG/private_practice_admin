'use client';
// import React from 'react';

import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../slices/specialistSlice';

const dummyJobsCount = 6;
const buttonLabels = [
  { label: `Personal Details(${dummyJobsCount})`, path: 'personal' },
  { label: `Completed Jobs(${dummyJobsCount})`, path: 'completed' },
  { label: `Pending Jobs(${dummyJobsCount})`, path: 'pending' },
  { label: `Declined Jobs(${dummyJobsCount})`, path: 'decline' }
];

const SpecialistTypeSelectionNavigationBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="mb-10 flex items-center justify-center text-[#111B2B] text-[10px] border-t-[1px] border-b-[1px] h-[50px]">
      {buttonLabels.map((button, index) => (
        <button
          key={index}
          onClick={() => dispatch(setCurrentPage(button.path))}
          className="w-full hover:bg-[#7EA2BE] hover:text-white px-3 border-l border-r flex-1 h-full poppins"
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default SpecialistTypeSelectionNavigationBar;
