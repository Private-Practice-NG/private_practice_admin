import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import ViewApplicationModal from '../../../../components/ViewApplicationModal';
const HospitalProfileCard = ({ profileData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!profileData) return null;

  const { hospitalName, rating, approvalStatus, _id, profileImage } =
    profileData;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hospital-profile-card border-t-[1px] border-b-[1px] py-3 border-gray-300 flex flex-col gap-x-[40px] gap-y-[30px] md:flex-row sm:justify-between sm:items-center">
      <div className="w-full md:w-4/12 flex gap-4 items-center">
        <div className="w-[50px] h-[50px] rounded-full">
          <img
            src={profileImage.imageUrl}
            alt="profile-image"
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <div className="flex flex-col item-center gap-[5px]">
          <h3 className="font-semibold poppins">{hospitalName}</h3>
          <Rating
            size={'20px'}
            readonly={true}
            initialValue={rating}
            iconsCount={5}
          />
        </div>
      </div>
      <section className="w-full md:w-8/12 flex justify-between items-center flex-row-reverse md:flex-row">
        <div className="flex gap-3 items-center">
          <span className="poppins">Enrolment Status: </span>
          <span className="underline">
            {approvalStatus ? approvalStatus : '-- -- --'}
          </span>
        </div>
        <div>
          {approvalStatus === 'approved' ? (
            <Link
              to={`/hospital/${_id}`}
              className="py-[10px] px-4 rounded-[7px] bg-[#10acf5] text-white min-w-[150px] text-center"
            >
              View profile
            </Link>
          ) : (
            <button
              onClick={handleOpenModal}
              className="py-[10px] px-4 rounded-[7px] bg-[#10acf5] text-white min-w-[150px] text-center"
            >
              View application
            </button>
          )}
        </div>
      </section>
      <ViewApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        hospital={profileData}
      />
    </div>
  );
};

export default HospitalProfileCard;
