import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }
  return (
    <section>
      <h1 className="text-5xl mt-20">this is the home page</h1>
    </section>
  );
};

export default Home;
