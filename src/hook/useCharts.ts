import { useEffect, useState } from "react";
import { initialCharts } from "@/lib/data";
import useLoadingStore from "@/app/store/useLoadingStore";

export interface ChartWithData {
  id: string;
  dashboardId: string;
  type: "bar" | "line" | "number";
  title: string;
  order: number;
  data: any;
}

export function useCharts(dashboardId: string) {
  const [charts, setCharts] = useState<ChartWithData[]>([]);
  const { isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(true);
    try {
      const storedCharts = localStorage.getItem("charts");
      const allCharts: ChartWithData[] = storedCharts
        ? JSON.parse(storedCharts)
        : initialCharts;
      const filtered = allCharts
        .filter((c) => c.dashboardId === dashboardId)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setCharts(filtered);
    } catch {
      setCharts([]);
    } finally {
      setLoading(false);
    }
  }, [dashboardId, setLoading]);

  const saveCharts = (updatedCharts: ChartWithData[]) => {
    setCharts(updatedCharts);
    localStorage.setItem("charts", JSON.stringify(updatedCharts));
  };

  return { charts, setCharts: saveCharts, isLoading };
}
//차트 데이터 리스트를 로드/저장
