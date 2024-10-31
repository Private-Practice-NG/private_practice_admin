// import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';
import GlobalModal from './components/GlobalModal';
import axios from 'axios';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PasswordResetMessage from './pages/PasswordResetMessage';
import Home from './pages/Home';
import Admins from './pages/Admins';
import Specialists from './pages/Specialists';
import Hospitals from './pages/Hospitals';
// import SpecialistDetails from './components/SpecialistDetails';
import Hospital from './components/Hospital';
import NotFound from './pages/NotFound';
import CreateAdmin from './pages/Admins/components/CreateAdmin';
import JobsPage from './pages/Jobs';
import HospitalsEnrolment from './pages/HospitalsEnrolment';
import UpdateAdmin from './pages/Admins/components/UpdateAdmin';
import Specialist from './pages/Specialist';
import SingleJob from './pages/Jobs/components/job';
import { getUserInfo, getAccessToken, storeUserInfo } from './utils/tokenUtils';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  /* 
  The implementation below, fetches the user's profile image from the server
  and updates the user's profile image in the local storage.
  This is done to ensure that the user's profile image is up to date since AWS 
  S3 pre-signer SDK was used, and all file URLs will expire after about 7 days.
  */

  const userInfo = getUserInfo();
  const token = getAccessToken();

  console.log('userInfo outside', userInfo);

  if (userInfo && userInfo.profileImageData) {
    console.log('userInfo inside', userInfo);

    const imageTimeToLive = userInfo.profileImageData.lastFetch + 590400000;

    if (imageTimeToLive < Date.now()) {
      const handleUpdateUserProfileImage = async () => {
        const response = await axios.get(
          `http://localhost:3001/api/v1/admin/get-admin-profile/${userInfo.userId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              Email: userInfo.email
            }
          }
        );

        if (response.status === 200) {
          // console.log(response);

          const updatedUserInfo = {
            ...userInfo,
            profileImageData: response.data.response.adminProfile.profileImage
          };

          storeUserInfo(updatedUserInfo);

          // console.log('user profile image updated', updatedUserInfo);
        }
      };

      handleUpdateUserProfileImage();
    } else {
      // console.log('userProfileImage not expired', userInfo);
    }
  }

  return (
    // <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/password-reset-message"
          element={<PasswordResetMessage />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/admins/create-admin-account" element={<CreateAdmin />} />
        <Route
          path="/admins/update-admin-account/:adminId"
          element={<UpdateAdmin />}
        />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospitals-enrolment" element={<HospitalsEnrolment />} />
        <Route path="/specialists" element={<Specialists />} />
        <Route path="/specialist/:specialistId" element={<Specialist />} />
        <Route path="/jobs/job/:jobId" element={<SingleJob />} />
        <Route path="/hospital/:userId" element={<Hospital />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalModal />
      {/* <ToastContainer /> */}
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
