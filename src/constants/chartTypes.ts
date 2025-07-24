export const CHART_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "number", label: "Number" },
];

export type ChartType = (typeof CHART_TYPES)[number]["value"];
