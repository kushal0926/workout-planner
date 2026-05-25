import type { UserProfile } from "../types";

// Use environment-based API URL, with fallback to localhost for development
const BASE_URL = import.meta.env["VITE_API_URL"] || "http://localhost:5001";

// Add a request timeout utility
const TIMEOUT_MS = 30000;

const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

async function post(path: string, body: object) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/v1${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${res.status}: Response failed`);
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to make POST request");
  }
}

async function get(path: string) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/v1${path}`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${res.status}: Request failed`);
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to make GET request");
  }
}

export const api = {
  saveProfile: (userId: string, profile: Omit<UserProfile, "userId" | "updatedAt">) => {
    return post("/profile", { userId, ...profile });
  },

  generatePlan: (userId: string) => {
    return post("/plan/generate", { userId });
  },

  getCurrentPlan: (userId: string) => {
    return get(`/plan/current?userId=${userId}`);
  },
};
