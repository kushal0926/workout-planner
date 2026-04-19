import { Route } from "react-router";
import { Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Navbar from "./components/layout/Navbar";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";

export default function App() {
  return (
    <NeonAuthUIProvider authClient={authClient}>
      <BrowserRouter>
        <div className="min-h-screen flex-col">
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/:pathname" element={<Auth />} />
            <Route path="/account/:pathname" element={<Account />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NeonAuthUIProvider>
  );
}
