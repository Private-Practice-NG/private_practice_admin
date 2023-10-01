import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgetPassword";
import ForgotPassMsg from "./pages/ForgotPassMsg";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-pass-msg" element={<ForgotPassMsg />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
