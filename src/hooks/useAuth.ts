import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import type { AuthContextType } from "../types";

export const useAuth = () => {
  const context: AuthContextType | null = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an auth provider");
  }
  return context;
};
