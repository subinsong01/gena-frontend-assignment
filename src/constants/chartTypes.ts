export const CHART_TYPES = [
  { value: "number", label: "Number" },
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
] as const;

export type ChartType = (typeof CHART_TYPES)[number]["value"];
