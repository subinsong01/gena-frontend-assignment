import { Dashboard } from "@/types/dashboards";
import {
  loadDashboardsFromLocalStorage,
  saveDashboardToLocalStorage,
} from "./dashboardLocalStorage";

export function checkDuplicateName(name: string): boolean {
  const dashboards = loadDashboardsFromLocalStorage();
  return dashboards.some((d) => d.name.toLowerCase() === name.toLowerCase());
}

export function createDashboard(name: string): Dashboard {
  const newDashboard: Dashboard = {
    id: `dashboard-${Date.now()}`,
    name: name.trim(),
    charts: [],
  };
  saveDashboardToLocalStorage(newDashboard);
  return newDashboard;
}
