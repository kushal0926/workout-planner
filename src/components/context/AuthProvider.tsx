import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { authClient } from "../../lib/auth";
import { AuthContext } from "./AuthContext";
import type { TrainingPlan, UserProfile } from "../../types";
import { api } from "../../lib/API";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshingRef = useRef(false);

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

  // refreshData memoize
  const refreshData = useCallback(async () => {
    if (!neonUser || isRefreshingRef.current) return;

    isRefreshingRef.current = true;

    try {
      // Fetch Plan
      const planData = await api.getCurrentPlan(neonUser.id).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [neonUser]);

  async function saveProfile(profileData: Omit<UserProfile, "userId" | "updatedAt">) {
    if (!neonUser) {
      throw new Error("user must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
    await refreshData();
  }

  async function generatePlan() {
    if (!neonUser) {
      throw new Error("user must be authenticated to save profile");
    }

    await api.generatePlan(neonUser.id);
    await refreshData();
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
