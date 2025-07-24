"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChartEditForm from "@/components/ChartEditForm";
import Spinner from "@/components/Spinner";
import { ChartType } from "@/types/chart";
import { loadCharts, saveCharts, Chart } from "@/lib/chartStorage";
export default function EditChartPage() {
  const router = useRouter();
  const params = useParams();
  const chartId = Array.isArray(params?.chartId)
    ? params.chartId[0]
    : params?.chartId;

  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (!chartId) return;

    const allCharts = loadCharts();
    const foundChart = allCharts.find((c) => c.id === chartId);
    setChart(foundChart ?? null);
  }, [chartId]);

  const handleSave = (updatedChart: Chart) => {
    try {
      const allCharts = loadCharts();

      const updatedCharts = allCharts.map((c) =>
        c.id === updatedChart.id ? updatedChart : c
      );

      saveCharts(updatedCharts);
      router.push(`/dashboards/${updatedChart.dashboardId}`);
    } catch (error) {
      console.error("Error saving chart to localStorage", error);
    }
  };

  if (!chart)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );

  return (
    <ChartEditForm
      {...chart}
      type={chart.type as ChartType}
      onSave={handleSave}
    />
  );
}
