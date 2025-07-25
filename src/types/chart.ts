export const CHART_TYPES = ["bar", "line", "number"] as const;
export type ChartType = (typeof CHART_TYPES)[number];

export interface ChartData {
  value?: number;
  labels?: string[];
  values?: number[];
}

export interface Chart {
  id: string;
  dashboardId: string;
  type: ChartType;
  title: string;
  data: ChartData;
  order?: number;
}

//내부 로직에서 타입 체크할 때
