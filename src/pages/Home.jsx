import React from "react";
import "./styles/home.css";
import HomeUsers from "../components/HomeUsers";
import HomeAdmins from "../components/HomeAdmins";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDashboardMutation } from "../slices/usersApiSlice";
import { setDashboard } from "../slices/dashboardSlice";
import { setNav } from "../slices/usersSlice";

const Home = () => {
  const dispatch = useDispatch();
  dispatch(setNav("Home"))
  
  const [dashboardApiCall, { isLoading }] = useDashboardMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await dashboardApiCall().unwrap();
        dispatch(setDashboard({ ...res.data }));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  const { dashboardInfo } = useSelector((state) => state.dashboard);
  return (
    <div className="home">
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
      <HomeAdmins home={true} dashboardInfo={dashboardInfo}/>
    </div>
  );
};

export default Home;
