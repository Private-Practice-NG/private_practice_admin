import { useState } from 'react';
import './styles/home.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeUsers from '../components/HomeUsers';
import HomeAdmins from '../components/HomeAdmins';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import axios from 'axios';
import toast from 'react-hot-toast';

// const override = {
//   margin: '0 auto',
//   width: '100%',
//   top: '35%',
//   left: '35%'
// };
// const override = {
//   backgroundColor: 'transparent', // no background color for this spinner
//   width: '300px!important' // width of the spinner
// };

const serverBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [adminHomeData, setAdminHomeData] = useState([]);
  const [user, setUser] = useState(null);

  // const [dashboardApiCall, { isLoading }] = useDashboardMutation();
  // const isLoading = true;

  // useEffect(() => {
  //   dispatch(setNav('Home'));
  //   async function fetchData() {
  //     try {
  //       const res = await dashboardApiCall().unwrap();
  //       dispatch(setDashboard({ ...res.data }));
  //     } catch (error) {
  //       console.log(error?.data?.message || 'Reload the Page');
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    dispatch(setNav('Home'));
    async function fetchData() {
      try {
        const adminUser = await axios.get(
          `${serverBaseUrl}/api/admins/dashboard`,
          {
            withCredentials: true
            // headers: {
            //   Authorization: `Bearer ${userAccessToken}`,
            //   Email: `${userEmail}`,
            // },
          }
        );

        if (
          adminUser
          // &&
          // loggedInUser.data.requestStatus === 'login successful'
        ) {
          // console.log('adminUser data fetched successfully');

          // console.log(dashboardData.data.response);

          setUser(adminUser);
          // setIsLoading(false);
        }
        // dispatch(setAdmins(adminProfiles.data));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setNav('Home'));
    async function fetchData() {
      try {
        const toastId = toast.loading('fetching dashboard data...');

        const dashboardData = await axios.get(
          'http://localhost:5000/api/admins/dashboard',
          {
            withCredentials: true
            // headers: {
            //   Authorization: `Bearer ${userAccessToken}`,
            //   Email: `${userEmail}`,
            // },
          }
        );

        if (
          dashboardData
          // &&
          // loggedInUser.data.requestStatus === 'login successful'
        ) {
          toast.success('dashboard data fetched successfully', {
            id: toastId,
            duration: 4000
          });

          // console.log(dashboardData.data.response);

          setAdminHomeData(dashboardData.data.response);
          setIsLoading(false);
        }
        // dispatch(setAdmins(adminProfiles.data));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  // const { dashboardInfo } = useSelector((state) => state.dashboard);
  // console.log('dI', dashboardInfo);

  return (
    <div className="home">
      {isLoading ? (
        <div className="spinner flex justify-center items-center">
          <FadeLoader
            color={'#10ACF5'}
            loading={true}
            // cssOverride={override}
            // size={300}
            height={40}
            width={2}
            radius={10}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <section className="flex flex-col w-full gap-[30px]">
          {/* <div className="home-metrics">
            <div className="metric full-metric">
              <h3>Total job Posted</h3>
              <h1>{dashboardInfo?.stats?.totalJob}</h1>
            </div>
            <div className="metric full-metric metric-hospital">
              <h3>Hospital</h3>
              <h1>{dashboardInfo?.stats?.hospital}</h1>
            </div>
            <div className="metric half-metric">
              <div className="half-metric-first">
                <h4>Pending Jobs</h4>
                <h2>{dashboardInfo?.stats?.pendingJobs}</h2>
              </div>
              <div className="metric half-metric-sec">
                <h4>Completed Jobs</h4>
                <h2>{dashboardInfo?.stats?.completedJobs}</h2>
              </div>
            </div>
            <div className="metric full-metric metric-specialist">
              <h3>Specialist</h3>
              <h1>{dashboardInfo?.stats?.specialist}</h1>
            </div>
          </div> */}
          <HomeUsers adminHomeData={adminHomeData} />
          <HomeAdmins home={true} adminHomeData={adminHomeData} />
        </section>
      )}
    </div>
  );
};

export default Home;
