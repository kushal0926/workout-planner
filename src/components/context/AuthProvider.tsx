import { useEffect, useState, type ReactNode } from "react";
import { authClient } from "../../lib/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        setNeonUser(result?.data?.user ?? null);
      } catch (error) {
        console.error(error);
        setNeonUser(null);
      } finally {
        setIsLoading(true);
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
