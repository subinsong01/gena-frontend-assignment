export const CHART_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "number", label: "Number" },
] as const;

export type ChartType = (typeof CHART_TYPES)[number]["value"];

export interface Chart {
  id: string;
  dashboardId: string;
  type: ChartType;
  title: string;
  data: { value: number } | { labels: string[]; values: number[] };
  order: number;
}
