const PersonalDetails = ({ specialistProfileData }) => {
  return (
    <div className="flex flex-col py-5 w-[90%] mx-auto">
      <>
        <div className="person-details-info">
          <h3 className="font-semibold text-[#1F2737] text-base mb-7">
            Personal Information
          </h3>
          <div className="text-xs mb-4 grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4  border-b-stone-950">
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">full name</h4>
              <p className="text-[#545F7D] text-xs font-bold">
                {specialistProfileData.firstName}{' '}
                {specialistProfileData.lastName}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">PHONE NUMBER</h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">EMAIL ADDRESS</h4>
              <p className="text-[#545F7D] text-xs font-bold">
                {specialistProfileData.email}
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">bvn</h4>
              <p className="text-[#545F7D] text-xs font-bold">-----</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">GENDER</h4>
              <p className="text-[#545F7D] text-xs font-bold">-----</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">marital status</h4>
              <p className="text-[#545F7D] text-xs font-bold">-------</p>
            </div>
            <div className=" flex flex-col gap-1 ">
              <h4 className="text-[#6E7792]  uppercase">children</h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">type of residence</h4>
              <p className="text-[#545F7D] text-xs font-bold">-----</p>
            </div>
          </div>
        </div>
        <div className="Education and Employment">
          <h3 className="font-semibold text-[#1F2737] text-base mb-7">
            Education and Employment
          </h3>
          <div className="text-xs mb-4 grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4  border-b-stone-950">
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">
                Level of education
              </h4>
              <p className="text-[#545F7D] text-xs font-bold">-------</p>
            </div>
            <div className="flex flex-col gap-1 mb-5">
              <h4 className="text-[#6E7792] text-xs uppercase">
                employment status
              </h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">
                sector of employment
              </h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">office email</h4>
              <p className="text-[#545F7D] text-xs font-bold">-------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">
                monthly income
              </h4>
              <p className="text-[#545F7D] text-xs font-bold">-----</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">
                duration of employment
              </h4>
              <p className="text-[#545F7D] text-xs font-bold">-------</p>
            </div>
          </div>
        </div>
        <div className="person-details-info">
          <h3 className="font-semibold text-[#1F2737] text-base mb-7">
            Social
          </h3>
          <div className="text-xs mb-4 grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4  border-b-stone-950">
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">twitter</h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">facebook</h4>
              <p className="text-[#545F7D] text-xs font-bold">--------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] uppercase">instagram</h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
          </div>
        </div>
        <div className="person-details-info">
          <h3 className="font-semibold text-[#1F2737] text-base mb-7">
            Guarantor
          </h3>
          <div className="text-xs mb-4 grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4  border-b-stone-950">
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">full name</h4>
              <p className="text-[#545F7D] text-xs font-bold">-------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">phone number</h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">
                email address
              </h4>
              <p className="text-[#545F7D] text-xs font-bold">------</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[#6E7792] text-xs uppercase">relationship</h4>
              <p className="text-[#545F7D] text-xs font-bold">--------</p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PersonalDetails;
