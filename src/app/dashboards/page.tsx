"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/types/dashboards";
import { initialDashboards } from "@/lib/data";
import { loadDashboards, saveDashboards } from "@/lib/localDb";
import { toast } from "react-toastify";
import DragAndDrop from "@/components/DragAndDrop";
import { DashboardListItem } from "@/components/DashboardListItem";

export default function DashboardsPage() {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  useEffect(() => {
    const storedDashboards = loadDashboards();

    if (storedDashboards.length > 0) {
      setDashboards(storedDashboards);
    } else {
      setDashboards(initialDashboards);
      saveDashboards(initialDashboards);
    }
  }, []);

  const goToDetailDashboardPage = (id: string) => {
    router.push(`/dashboards/${id}`);
  };

  const handleDeleteDashboard = (id: string) => {
    if (!confirm("Are you sure you want to delete this dashboard?")) return;

    const updated = dashboards.filter((dashboard) => dashboard.id !== id);
    setDashboards(updated);
    saveDashboards(updated);
    toast.success("Dashboard deleted successfully!");
  };

  const handleReorder = (newOrder: Dashboard[]) => {
    setDashboards(newOrder);
    saveDashboards(newOrder);
    toast.success("Dashboard order updated!");
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-2xl font-bold mb-8 sm:text-3xl">📬 All Dashboards</h1>

      {dashboards.length === 0 ? (
        <>
          <p className="text-information-color text-center my-3">
            No dashboards found.
          </p>
          <button
            onClick={() => router.push("/create-dashboard")}
            className="mt-6 px-10 py-3 font-bold bg-primary-color text-white hover:bg-primary-color-hover transition rounded-lg"
          >
            Create Your First Dashboard
          </button>
        </>
      ) : (
        <DragAndDrop
          items={dashboards}
          getId={(dashboard) => dashboard.id}
          onDragEnd={handleReorder}
          renderItem={(dashboard, _index, isDragging) => (
            <DashboardListItem
              dashboard={dashboard}
              isDragging={isDragging}
              onClick={goToDetailDashboardPage}
              onEdit={(id) => router.push(`/edit-dashboard/${id}`)}
              onDelete={handleDeleteDashboard}
            />
          )}
        />
      )}
    </div>
  );
}
