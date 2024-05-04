// import React from "react";
import './styles/home.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDashboardMutation } from '../slices/usersApiSlice';
import HomeUsers from '../components/HomeUsers';
import HomeAdmins from '../components/HomeAdmins';
import { setDashboard } from '../slices/dashboardSlice';
import { setNav } from '../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';

const override = {
  margin: '0 auto',
  width: '100%',
  top: '35%',
  left: '35%'
};

const Home = () => {
  const dispatch = useDispatch();

  const [dashboardApiCall, { isLoading }] = useDashboardMutation();

  useEffect(() => {
    dispatch(setNav('Home'));
    async function fetchData() {
      try {
        const res = await dashboardApiCall().unwrap();
        dispatch(setDashboard({ ...res.data }));
      } catch (error) {
        console.log(error?.data?.message || 'Reload the Page');
      }
    }
    fetchData();
  }, []);

  const { dashboardInfo } = useSelector((state) => state.dashboard);

  return (
    <div className="home">
      {isLoading ? (
        <div className="spinner mx-auto">
          <FadeLoader
            color={'#10ACF5'}
            loading={isLoading}
            cssOverride={override}
            size={300}
            height={50}
            width={4}
            radius={10}
            margin={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="home-metrics">
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
          </div>
          <HomeUsers />
          <HomeAdmins home={true} dashboardInfo={dashboardInfo} />
        </>
      )}
    </div>
  );
};

export default Home;
