import { Dashboard } from "@/types/dashboards";

const STORAGE_KEY = "dashboards";

export const loadDashboards = (): Dashboard[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load dashboards from localStorage:", error);
    return [];
  }
};

export const saveDashboards = (dashboards: Dashboard[]): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboards));
  } catch (error) {
    console.error("Failed to save dashboards to localStorage:", error);
  }
};
