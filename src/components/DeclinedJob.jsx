import { HiMiniXCircle } from 'react-icons/hi2';

function DeclinedJobSection({ specialistProfileData }) {
  return (
    //   <Link
    //     href="/dashboard/specialist-dashboard/jobs/123"
    //     className="mt-10 w-full"
    //   >
    <div className="mb-10 flex flex-col p-4 w-full bg-[#565656] text-[#C3C5C7] rounded-lg">
      <h3 className="poppins text-xs font-bold">
        {specialistProfileData.firstName}
      </h3>
      <div className="flex flex-col mt-2">
        <span className="font-semibold text-xs block mb-4 sm:mb-8 sm:w-96">
          Patient needs a Consultation
        </span>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center mb-4 gap-1">
            <span>Inactive</span>
            <HiMiniXCircle size={20} className="text-[#EAF1F8]" />
          </div>
          <span className="block text-sm">Waiting for specialist</span>
        </div>
      </div>
    </div>
    //   </Link>
  );
}
export default DeclinedJobSection;
