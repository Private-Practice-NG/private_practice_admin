const JobProgress = () => {
  return (
    <div className="relative flex flex-col justify-center md:flex-row  md:justify-between items-center w-[50%] py-4">
      {/* Job Created */}
      <div className="relative flex flex-col w-full">
        <div className="relative flex items-center justify-center">
          <div className="hidden md:flex w-4 h-4 bg-[#19BE3E] rounded-full"></div>
          <div
            className="before:h-[2px] before:bg-[#19BE3E] before:inline-block flex
            justify-center items-center md:after:w-[100px] after:h-[2px] after:bg-[#19BE3E] after:inline-block px-1"
          ></div>
        </div>
        <p className="mt-2 text-xs">Job Created</p>
      </div>

      {/* Selection Phase */}
      <div className="relative flex flex-col items-centers w-full">
        <div className="relative flex items-center">
          <div className=" relative flex flex-col justify-center items-center md:flex-row md:items-center">
            <div className="hidden md:block w-4 h-4 bg-green-500 rounded-full"></div>
            <div
              className="before:h-[2px] before:bg-[#19BE3E] before:inline-block  font-bold after:w-[2px] after:h-[50px]  md:after:w-[100px] md:after:h-[2px] after:bg-[#19BE3E] after:inline-block flex px-1
            justify-center items-center"
            ></div>
          </div>
        </div>
        <p className="mt-2 text-xs">Selection Phase</p>
      </div>

      {/* Complete */}
      <div className="relative flex flex-col w-full">
        <div className="relative flex items-center">
          <div className="relative flex flex-col justify-center items-center md:flex-row md:items-center">
            <div className="hidden md:block w-4 h-4 bg-green-500 rounded-full"></div>
            <div
              className="before:h-[2px] before:bg-[#19BE3E] before:inline-block  font-bold after:w-[2px] after:h-[50px]  md:after:w-[100px] md:after:h-[2px] after:bg-[#19BE3E] after:inline-block flex px-1
            justify-center items-center"
            ></div>
          </div>
        </div>
        <p className="mt-2 text-xs">Complete</p>
      </div>

      {/* Job Completed */}
      <div className="relative flex flex-col justify-center w-full">
        <div className="relative flex items-center">
          <div className="relative flex flex-col justify-center items-center md:flex-row md:items-center">
            <div className="hidden md:block w-4 h-4 bg-green-500 rounded-full"></div>
            <div
              className="before:h-[2px] before:bg-[#19BE3E] before:inline-block  font-bold after:w-[2px] after:h-[50px]  md:after:w-[100px] md:after:h-[2px] after:bg-[#19BE3E] after:inline-block flex px-1
            justify-center items-center"
            ></div>
          </div>
        </div>
        <p className="mt-2 text-xs">Job Completed</p>
      </div>
    </div>
  );
};

export default JobProgress;
