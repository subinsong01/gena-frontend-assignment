"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "@/types/dashboards";
import useLoadingStore from "@/app/store/useLoadingStore";
import Spinner from "@/components/Spinner";
import { loadDashboards, saveDashboards } from "../../../lib/dashboardStorage";
import { toast } from "react-toastify";
export default function EditDashboardPage({
  params,
}: {
  params: { dashboardId: string };
}) {
  const router = useRouter();
  const { dashboardId } = params;

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(true);

    const allDashboards = loadDashboards();
    const targetDashboard =
      allDashboards.find((d) => d.id === dashboardId) || null;

    setDashboard(targetDashboard);
    setTitle(targetDashboard?.name || "");
    setLoading(false);
  }, [dashboardId, setLoading]);

  const handleSave = () => {
    if (!dashboard || title.trim() === "") {
      setError("You should enter a dashboard name.");
      return;
    }

    setError("");

    const allDashboards = loadDashboards();
    const updatedDashboards = allDashboards.map((d) =>
      d.id === dashboard.id ? { ...d, name: title } : d
    );

    saveDashboards(updatedDashboards);
    toast.success("updated successfully!");
    router.push("/dashboards");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  if (!dashboard) return <div>Dashboard not found</div>;

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Dashboard</h1>
      <label className="block mb-2 font-semibold">Dashboard Title</label>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
        }}
        type="text"
        className="w-full border border-input-box-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent rounded px-3 py-2 mb-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {error && <p className="text-error-color text-sm mb-4">{error}</p>}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-primary-color text-white font-semibold rounded-lg shadow hover:bg-primary-color-hover transition mt-3"
        >
          Save
        </button>
      </div>
    </div>
  );
}
