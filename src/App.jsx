// import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordMessage from './pages/ForgotPasswordMessage';
// import Layout from './components/Layout';
import Home from './pages/Home';
import Admins from './pages/Admins';
import Specialists from './pages/Specialists';
import Hospitals from './pages/Hospitals';
import SpecialistDetails from './components/SpecialistDetails';
import Hospital from './components/Hospital';
import NotFound from './pages/NotFound';
// import PrivateRoute from './components/PrivateRoute';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateAdmin from './pages/Admins/components/CreateAdmin';
import JobsPage from './pages/Jobs';
import HospitalsEnrolment from './pages/HospitalsEnrolment';
import UpdateAdmin from './pages/Admins/components/UpdateAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-message"
          element={<ForgotPasswordMessage />}
        />

        {/* <Route path="/" element={<Layout />}> */}
        {/* <Route path="" element={<PrivateRoute />}/> */}
        <Route path="/" element={<Home />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/admins/create-admin-account" element={<CreateAdmin />} />
        <Route path="/admins/update-admin-account" element={<UpdateAdmin />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospitals-enrolment" element={<HospitalsEnrolment />} />
        <Route path="/specialists" element={<Specialists />} />
        <Route path="/specialist/:userId" element={<SpecialistDetails />} />
        <Route path="/hospital/:userId" element={<Hospital />} />
        <Route path="*" element={<NotFound />} />
        {/* </Route> */}
        {/* </Route> */}
      </Routes>
      {/* <ToastContainer /> */}
    </BrowserRouter>
  );
}

export default App;
