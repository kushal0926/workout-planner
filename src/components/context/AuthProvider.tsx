import { useEffect, useState, type ReactNode } from "react";
import { authClient } from "../../lib/auth";
import { AuthContext } from "./AuthContext";
import type { UserProfile } from "../../types";
import { api } from "../../lib/API";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (error) {
        setNeonUser(null);
        console.error("failed to load user", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!neonUser) {
      throw new Error("user must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
  }

  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
