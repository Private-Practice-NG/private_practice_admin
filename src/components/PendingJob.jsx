import { HiCheckBadge, HiOutlineClock } from 'react-icons/hi2';

function PendingJobSection() {
  return (
    <div className="mb-10 flex flex-col p-4 w-full bg-[#EEF5FB] rounded-lg">
      <h3 className="poppins text-[#565656] text-xs font-bold">Optician</h3>
      <div className="flex flex-col mt-2">
        <span className="text-[#565656] font-semibold text-xs block mb-4 sm:mb-8 sm:w-96">
          Patient needs a quick eye consultation / check up
        </span>
        <div className="text-xs flex justify-between mt-4 text-[#565656] font-medium">
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4 gap-1">
              <span>Active</span>
              <HiCheckBadge size={20} className="text-[#BACB51]" />
            </div>
            <span className="block">Patient is being attended to</span>
          </div>
          <div className="flex items-center  gap-2 sm:gap-4">
            <HiOutlineClock size={20} />
            <span>1hr ago</span>
          </div>
        </div>
      </div>
    </div>
    //   </Link>
  );
}
export default PendingJobSection;
