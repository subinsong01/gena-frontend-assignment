import { Dashboard } from "@/types/dashboards";

export const saveDashboardToLocalStorage = (dashboard: Dashboard) => {
  try {
    const stored = localStorage.getItem("dashboards");
    const dashboards: Dashboard[] = stored ? JSON.parse(stored) : [];
    dashboards.push(dashboard);
    localStorage.setItem("dashboards", JSON.stringify(dashboards));
  } catch (error) {
    console.error("Failed to save dashboard:", error);
  }
};

export const loadDashboardsFromLocalStorage = (): Dashboard[] => {
  try {
    const stored = localStorage.getItem("dashboards");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
