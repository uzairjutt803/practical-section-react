import { Navigate, Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Nopage from "@/components/misc/Nopage";
import { useAuthContext } from "@/context/Auth";
import PrivateRoutes from "../components/misc/PrivateRoutes";

const Index = () => {
  const { isAuth } = useAuthContext();


  return (
    <>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route
          path="auth/*"
          element={!isAuth ? <Auth /> : <Navigate to="/dashboard" />}
        />
        <Route path="dashboard/*" element={<PrivateRoutes Component={Dashboard} />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </>
  );
};

export default Index;
