'use client';
import { useSelector } from 'react-redux';
import PersonalDetails from '../components/PersonalDetails';
import DeclinedJob from '../components/DeclinedJob';
import CompletedJobs from '../components/JobCompleted';
import PendingJobs from '../components/PendingJob';

const SpecialistContent = ({ specialistProfileData }) => {
  const currentPage = useSelector((state) => state.specialist.currentPage);

  switch (currentPage) {
    case 'personal':
      return <PersonalDetails specialistProfileData={specialistProfileData} />;
    case 'completed':
      return <CompletedJobs specialistProfileData={specialistProfileData} />;
    case 'pending':
      return <PendingJobs specialistProfileData={specialistProfileData} />;
    case 'decline':
      return <DeclinedJob specialistProfileData={specialistProfileData} />;
    default:
      return <PersonalDetails specialistProfileData={specialistProfileData} />;
  }
};

export default SpecialistContent;
