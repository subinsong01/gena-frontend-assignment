"use client";

import { useSearchParams } from "next/navigation";
import ChartForm from "@/components/ChartForm";

export default function ChartPage() {
  const searchParams = useSearchParams();
  const dashboardId = searchParams.get("dashboardId");
  const mode = (searchParams.get("mode") as "create" | "configure") || "create";

  if (!dashboardId) {
    return <div>Dashboard ID is missing</div>;
  }

  return (
    <ChartForm
      mode={mode}
      dashboardId={dashboardId}
      showPreview={mode === "configure"}
      showDashboardName={mode === "configure"}
      showBackButton={mode === "configure"}
    />
  );
}
