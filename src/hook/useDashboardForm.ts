import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useLoadingStore from "@/app/store/useLoadingStore";
import { checkDuplicateName, createDashboard } from "@/utils/dashboardService";

export function useDashboardForm() {
  const router = useRouter();
  const [dashboardName, setDashboardName] = useState("");
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoadingStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!dashboardName.trim()) {
        setError("Dashboard name is required");
        toast.error("Please enter a dashboard name");
        return;
      }

      if (checkDuplicateName(dashboardName)) {
        setError("A dashboard with this name already exists");
        toast.error("Dashboard name already exists");
        return;
      }

      const dashboard = createDashboard(dashboardName);
      toast.success("Dashboard created successfully!");

      setTimeout(() => {
        router.push(`/chart?mode=configure&dashboardId=${dashboard.id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create dashboard");
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboardName,
    setDashboardName,
    error,
    isLoading,
    handleSubmit,
  };
}
//대시보드 이름을 입력받아 유효성 검사 → 중복 검사 → 생성 후 페이지 이동까지 처리
