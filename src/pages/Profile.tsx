import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const plan: boolean = true;

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (plan) {
    return <Navigate to="/onboarding" replace />;
  }
  return <div className="text-4xl mt-10"> this is the profile page</div>;
};

export default Profile;
