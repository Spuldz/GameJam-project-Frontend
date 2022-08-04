import { Route, Routes } from "react-router-dom";
import CustomizationPage from "./pages/CustomizationPage";
import DefaultPage from "./pages/DefaultPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/customization" element={<CustomizationPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
