export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  saveProfile: (profile: Omit<UserProfile, "userId" | "updatedAt">) => Promise<void>;
}

export interface UserProfile {
  userId: string;
  goal: "cut" | "bulk" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbbells";
  injuries?: string;
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
  updatedAt: string;
}
