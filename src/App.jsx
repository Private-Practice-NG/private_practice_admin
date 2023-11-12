import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgetPassword";
import ForgotPassMsg from "./pages/ForgotPassMsg";
import Layout from "./components/PageContainer";
import Home from "./pages/Home";
import Admins from "./pages/Admins";
import Specialists from "./pages/Specialists";
import Hospitals from './pages/Hospitals'
import SpecialistDetails from "./components/SpecialistDetails";
import Hospital from "./components/Hospital";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-pass-msg" element={<ForgotPassMsg />} />
          <Route path="/" element={<Layout />}>
            <Route path="" element={<PrivateRoute />}>
              <Route index element={<Home />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/specialists" element={<Specialists />} />
              <Route path="/specialist/:userId" element={<SpecialistDetails />} />
              <Route path="/hospital/:userId" element={<Hospital />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
