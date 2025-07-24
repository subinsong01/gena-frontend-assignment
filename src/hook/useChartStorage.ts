import { v4 as uuidv4 } from "uuid";
import { ChartType } from "@/constants/chartTypes";
import { loadDashboardsFromLocalStorage } from "@/utils/dashboardLocalStorage";

interface CreateChartParams {
  dashboardId: string;
  chartName: string;
  chartType: ChartType;
  chartData: any;
  mode: "create" | "configure";
}

interface Dashboard {
  id: string;
  name: string;
  charts: string[];
}

export const useChartStorage = () => {
  const loadDashboard = (dashboardId: string): Dashboard | null => {
    try {
      const dashboards = loadDashboardsFromLocalStorage();
      return dashboards.find((d: Dashboard) => d.id === dashboardId) || null;
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      return null;
    }
  };

  const createChart = async ({
    dashboardId,
    chartName,
    chartType,
    chartData,
    mode,
  }: CreateChartParams): Promise<string> => {
    try {
      const newChart = {
        id: uuidv4(),
        dashboardId,
        type: chartType,
        title: chartName.trim(),
        data: chartData,
        order: Date.now(),
      };

      const storedDashboards = localStorage.getItem("dashboards");
      const dashboards = storedDashboards ? JSON.parse(storedDashboards) : [];

      const storedCharts = localStorage.getItem("charts");
      const charts = storedCharts ? JSON.parse(storedCharts) : [];

      if (mode === "configure") {
        const dashboardIndex = dashboards.findIndex(
          (d: Dashboard) => d.id === dashboardId
        );

        if (dashboardIndex === -1) {
          throw new Error("Dashboard not found");
        }

        dashboards[dashboardIndex].charts.push(newChart.id);
        localStorage.setItem("dashboards", JSON.stringify(dashboards));
      }

      charts.push(newChart);
      localStorage.setItem("charts", JSON.stringify(charts));

      return newChart.id;
    } catch (error) {
      console.error("Error creating chart:", error);
      throw error;
    }
  };

  return {
    loadDashboard,
    createChart,
  };
};
