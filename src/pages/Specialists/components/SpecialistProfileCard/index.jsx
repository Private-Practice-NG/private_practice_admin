import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
// import mockAvatar from '../../../../assets/img-5.png';

function SpecialistProfileCard({ specialistProfile }) {
  console.log(specialistProfile);

  return (
    <div className="specialist-profile-card flex flex-col gap-4 min-h-[200px] bg-gray-100 px-4 py-6 rounded-[7px] ">
      <div className="bio-and-rating-case flex flex-col justify-center items-center gap-5">
        <div className="w-[70px] h-[70px] rounded-full">
          <img
            src={specialistProfile.profileImage.imageUrl}
            alt="profile-image"
            className="w-[70px] h-[70px] rounded-full"
          />
        </div>
        <div className="specialist-name-and-specialization text-[16px] flex flex-col gap-3 text-center">
          <span className="poppins font-semibold">
            {`${specialistProfile.firstName} ${specialistProfile.lastName}`}
          </span>
          <span
            className="bg-blue-100 p-1.5 px-3 rounded-[20px] text-[12px]"
            style={{ alignSelf: 'center' }}
          >
            Specialization
          </span>
        </div>
        <Rating
          size={'20px'}
          readonly={true}
          initialValue={specialistProfile.lastName}
          iconsCount={5}
        />
      </div>
      <div className="flex justify-center">
        <Link
          className="bg-[#10acf5] w-1/2 rounded-[7px] py-3 px-4 text-white poppins text-[14px] text-center mt-6"
          to={`/specialist/${specialistProfile._id}`}
        >
          View profile
        </Link>
      </div>
    </div>
  );
}

export default SpecialistProfileCard;
