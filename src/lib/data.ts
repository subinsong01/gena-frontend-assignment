import { Chart } from "@/types/chart";

export const initialDashboards = [
  {
    id: "dashboard-1",
    name: "Marketing KPIs",
    charts: ["chart-1", "chart-2"],
  },
];

export const initialCharts: Chart[] = [
  {
    id: "chart-1",
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Signups by Region",
    data: {
      labels: ["Seoul", "Busan", "Daegu"],
      values: [100, 200, 150],
    },
    order: 0,
  },
  {
    id: "chart-2",
    dashboardId: "dashboard-1",
    type: "line",
    title: "Orders Over Time",
    data: {
      labels: ["Jan", "Feb", "Mar"],
      values: [50, 80, 60],
    },
    order: 1,
  },
];
