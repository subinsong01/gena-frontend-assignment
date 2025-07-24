import { ChartType, ChartData } from "@/types/chart";

export interface Chart {
  id: string;
  dashboardId: string;
  type: ChartType;
  title: string;
  order?: number;
  data: ChartData;
}

const CHARTS_STORAGE_KEY = "charts";

export const loadCharts = (): Chart[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(CHARTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load charts from localStorage:", error);
    return [];
  }
};

export const saveCharts = (charts: Chart[]): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHARTS_STORAGE_KEY, JSON.stringify(charts));
  } catch (error) {
    console.error("Failed to save charts to localStorage:", error);
  }
};
