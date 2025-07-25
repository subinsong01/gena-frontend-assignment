"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DynamicChart from "@/components/DynamicChart";
import ChartFormInputs from "@/components/ChartFormInputs";
import ChartFormActions from "@/components/ChartFormActions";
import { useChartForm } from "@/hook/useChartForm";
import { useChartStorage } from "@/hook/useChartStorage";
import useLoadingStore from "@/app/store/useLoadingStore";

interface ChartFormProps {
  mode: "create" | "configure";
  dashboardId: string;
  dashboardName?: string;
  onSuccess?: (chartId: string) => void;
  showPreview?: boolean;
  showDashboardName?: boolean;
  showBackButton?: boolean;
}

export default function ChartForm({
  mode,
  dashboardId,
  dashboardName,
  onSuccess,
  showPreview = true,
  showDashboardName = false,
  showBackButton = false,
}: ChartFormProps) {
  const router = useRouter();
  const { isLoading, setLoading } = useLoadingStore();
  const [currentDashboardName, setCurrentDashboardName] = useState(
    dashboardName || ""
  );

  const {
    formData,
    error,
    updateFormData,
    validateForm,
    getChartDataForSave,
    getPreviewData,
  } = useChartForm();

  const { loadDashboard, createChart } = useChartStorage();

  useEffect(() => {
    if (!dashboardId || currentDashboardName) return;

    const dashboard = loadDashboard(dashboardId);
    if (dashboard) {
      setCurrentDashboardName(dashboard.name);
    }
  }, [dashboardId, currentDashboardName, loadDashboard]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(error || "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const chartData = getChartDataForSave();

      const chartId = await createChart({
        dashboardId,
        chartName: formData.chartName,
        chartType: formData.chartType,
        chartData,
        mode,
      });

      toast.success("Chart created successfully!");

      if (onSuccess) {
        onSuccess(chartId);
      } else {
        setTimeout(() => {
          router.push(`/dashboards/${dashboardId}`);
        }, 1000);
      }
    } catch (err) {
      console.error("Error creating chart:", err);
      toast.error("Failed to create chart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="w-full animate-fadeUp mt-6">
      {showDashboardName && currentDashboardName && (
        <h2 className="text-xl font-semibold mb-10">
          <span className="text-4xl text-primary-color">
            {currentDashboardName}
          </span>
        </h2>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div
            className="text-error-color text-sm"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
        <ChartFormInputs
          chartName={formData.chartName}
          chartType={formData.chartType}
          numberValue={formData.numberValue}
          labelsInput={formData.labelsInput}
          valuesInput={formData.valuesInput}
          isLoading={isLoading}
          onChartNameChange={(value) => updateFormData("chartName", value)}
          onChartTypeChange={(value) => updateFormData("chartType", value)}
          onNumberValueChange={(value) => updateFormData("numberValue", value)}
          onLabelsInputChange={(value) => updateFormData("labelsInput", value)}
          onValuesInputChange={(value) => updateFormData("valuesInput", value)}
        />

        {showPreview && (
          <div className="bg-gray-50 border rounded p-4 mt-6">
            <h3 className="text-xl font-semibold mb-3">Chart Preview</h3>
            <DynamicChart
              chartType={formData.chartType}
              data={getPreviewData()}
            />
          </div>
        )}

        <ChartFormActions
          mode={mode}
          isLoading={isLoading}
          showBackButton={showBackButton}
          onBack={handleBack}
        />
      </form>
    </section>
  );
}
