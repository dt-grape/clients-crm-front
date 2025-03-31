import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import StudentDetails from "./pages/StudentDetail.jsx";
import Tasks from "./pages/Tasks.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   const accessToken = Cookies.get("access_token");
  //   if (!accessToken) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/student/:studentId" element={<StudentDetails />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default App;
