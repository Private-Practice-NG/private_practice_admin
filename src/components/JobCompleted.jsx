import { HiStar } from 'react-icons/hi2';
import mockAvatar from '../assets/hospitalAvatar.png';

function JobCompletedSection() {
  // specialistProfileData
  return (
    <div className="p-4 w-full bg-[#EEF5FB] rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={mockAvatar}
            className="h-40 w-28 rounded-full"
            alt="Hospital Avatar"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2 capitalize">------</h3>
            <span className="block text-sm capitalize">--------</span>
            <div className="flex items-center gap-x-2 my-4">
              {Array.from({ length: 5 }, (_, index) => (
                <HiStar key={index} className="text-[#F6AB27]" size={25} />
              ))}
            </div>
            <span className="block text-xs mb-2">------</span>
            <div className="md:hidden text-lg font-bold">
              <span>------</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-lg font-bold">
          <span>--------</span>
        </div>
      </div>
    </div>
  );
}
export default JobCompletedSection;
