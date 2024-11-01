import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHospitalMutation,
  useActivateHospitalMutation
} from '../slices/usersApiSlice';
import { setHospital, setNav } from '../slices/usersSlice';
import { Rating } from 'react-simple-star-rating';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import profile from './../assets/hospitalAvatar.png';
import PersonalDetails from './PersonalDetails';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

const Hospital = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hospitalApiCall, { isLoading }] = useHospitalMutation();

  const [activateHospital, { isLoading: activateLoading }] =
    useActivateHospitalMutation();

  useEffect(() => {
    dispatch(setNav('Hospital'));
    async function fetchData() {
      try {
        const res = await hospitalApiCall(userId).unwrap();
        dispatch(setHospital(res.data));
      } catch (error) {
        toast.error(error?.data?.message || 'Something went wrong');
      }
    }
    fetchData();
  }, [userId, hospitalApiCall, dispatch]);

  const handleActivate = async () => {
    try {
      const nActivated = !hospital?.activated;
      const data = { id: hospital?._id, activated: nActivated };
      const res = await activateHospital(data).unwrap();
      dispatch(setHospital(res.data));
      const text = nActivated ? 'Activated' : 'Deactivated ';
      toast.success(`Hospital Account ${text}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const { hospital } = useSelector((state) => state.users);

  return (
    <section className="bg-[#ECECEC] rounded-[15px] py-8 max-w-[1440px] mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <FadeLoader
            color={'#10ACF5'}
            loading={isLoading}
            size={300}
            height={50}
            width={5}
            radius={10}
            margin={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <header className="w-[95%] mx-auto">
            <nav className="flex justify-between items-center py-8">
              <button
                className="flex items-center gap-2"
                onClick={() => navigate(-1)}
              >
                <MdOutlineArrowBackIosNew /> <span>Back</span>
              </button>
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <circle cx="8.5" cy="8.5" r="8.5" fill="#19BE3E" />
                  </svg>
                  <span>Verified</span>
                </div>
                {hospital?.activated ? (
                  activateLoading ? (
                    <FadeLoader color="#10ACF5" />
                  ) : (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={handleActivate}
                    >
                      Deactivate
                    </button>
                  )
                ) : activateLoading ? (
                  <FadeLoader color="#10ACF5" />
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={handleActivate}
                  >
                    Activate
                  </button>
                )}
                <Link className="text-blue-500">Reset Password</Link>
              </div>
            </nav>
            <section className="bg-[#D1D1D1] shadow-lg rounded-t-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-[120px] h-[120px] rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold">
                      {hospital?.hospitalName}
                    </h1>
                    <p className="tracking-widest uppercase">HOSPITAL</p>
                    <Rating
                      size={'25px'}
                      readonly={true}
                      initialValue={hospital?.rating ? hospital?.rating : 5}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-lg">
                    <p>Total Earnings</p>
                    <h1>₦326,200,000.23</h1>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="bg-gray-300 p-3 rounded-lg">
                      <p>Main Balance</p>
                      <h3>₦{hospital?.wallet?.balance}</h3>
                    </div>
                    <div className="bg-gray-300 p-3 rounded-lg">
                      <p>Book Balance</p>
                      <h4>₦{hospital?.wallet?.bookBalance}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-8 mt-12">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md active">
                  Personal Details
                </button>
                <button className="bg-gray-400 px-4 py-2 rounded-md">
                  Jobs Completed (6)
                </button>
                <button className="bg-gray-400 px-4 py-2 rounded-md">
                  Pending Jobs (2)
                </button>
                <button className="bg-gray-400 px-4 py-2 rounded-md">
                  Declined Jobs (9)
                </button>
              </div>
            </section>
          </header>
          <div className="bg-gray-300 py-12 w-[95%] mx-auto">
            <PersonalDetails user={'hospital'} data={hospital} />
          </div>
        </>
      )}
    </section>
  );
};

export default Hospital;
