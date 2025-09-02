import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TechnicianPage from "./pages/TechnicianPage";
import DentistPage from "./pages/DentistPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/technician"
          element={
            <ProtectedRoute role="Technician">
              <TechnicianPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dentist"
          element={
            <ProtectedRoute role="Dentist">
              <DentistPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
