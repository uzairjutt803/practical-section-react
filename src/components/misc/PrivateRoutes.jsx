import { useAuthContext } from "@/context/Auth";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ Component }) => {
  const { isAuth } = useAuthContext();

  if (!isAuth) return <Navigate to="/auth/login" />;

  return (
    <>
      <Component />
    </>
  );
};

export default PrivateRoutes;
