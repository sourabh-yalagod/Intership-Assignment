import { useUser } from "@clerk/clerk-react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();
  if (isLoaded && !isSignedIn) {
    navigate("/signin");
  }
  if (isLoaded && isSignedIn) {
    return <Outlet />;
  }
};

export default ProtectRoute;
