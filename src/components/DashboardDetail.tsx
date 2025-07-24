"use client";

import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import ChartItem from "./ChartItem";
import { useCharts } from "@/hook/useCharts";

interface DashboardDetailProps {
  dashboardId: string;
}

export default function DashboardDetail({ dashboardId }: DashboardDetailProps) {
  const router = useRouter();
  const { charts, setCharts, isLoading } = useCharts(dashboardId);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    const updatedCharts = charts.filter((chart) => chart.id !== id);
    setCharts(updatedCharts);

    if (!updatedCharts.some((chart) => chart.dashboardId === dashboardId)) {
      const storedDashboards = localStorage.getItem("dashboards");
      const allDashboards = storedDashboards
        ? JSON.parse(storedDashboards)
        : [];
      const updatedDashboards = allDashboards.filter(
        (dashboard: { id: string }) => dashboard.id !== dashboardId
      );
      localStorage.setItem("dashboards", JSON.stringify(updatedDashboards));
      router.push("/dashboards");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-chart/${id}`);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );

  if (charts.length === 0)
    return (
      <div className="text-center p-4">
        <p>No charts found</p>
        <button
          onClick={() =>
            router.push(`/chart?mode=configure&dashboardId=${dashboardId}`)
          }
          className="mt-3 px-10 py-3 bg-primary-color text-white rounded hover:bg-primary-color-hover transition"
        >
          ➕ Start by adding a new chart!
        </button>
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push(`/chart?dashboardId=${dashboardId}`)}
          className="mt-3 px-10 py-2 bg-primary-color text-white rounded hover:bg-primary-color-hover transition"
        >
          ➕ Add Chart
        </button>
      </div>

      {charts.map(({ id, type, title, data }) => (
        <ChartItem
          key={id}
          id={id}
          type={type}
          title={title}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
