import { useEffect, useState } from "react";
import { Dashboard } from "@/types/dashboards";
import { loadDashboards, saveDashboards } from "../lib/dashboardStorage";

export const useDashboard = (dashboardId: string) => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    const all = loadDashboards();
    const found = all.find((d) => d.id === dashboardId) || null;
    setDashboard(found);
  }, [dashboardId]);

  const updateDashboard = (updated: Dashboard) => {
    const all = loadDashboards();
    const newList = all.map((d) => (d.id === updated.id ? updated : d));
    saveDashboards(newList);
  };

  return { dashboard, updateDashboard };
};
