import { useState, useEffect } from "react";
import { ChartType } from "@/constants/chartTypes";

interface ChartFormData {
  chartName: string;
  chartType: ChartType;
  numberValue: number | "";
  labelsInput: string;
  valuesInput: string;
}

interface ChartData {
  name: string;
  value: number;
}

export const useChartForm = () => {
  const [formData, setFormData] = useState<ChartFormData>({
    chartName: "",
    chartType: "line",
    numberValue: "",
    labelsInput: "",
    valuesInput: "",
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.chartType === "bar" || formData.chartType === "line") {
      const labels = formData.labelsInput
        .split(",")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      const values = formData.valuesInput
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((v) => !isNaN(v));

      if (labels.length === values.length && labels.length > 0) {
        const formattedData = labels.map((label, idx) => ({
          name: label,
          value: values[idx],
        }));
        setChartData(formattedData);
      } else {
        setChartData([]);
      }
    }
  }, [formData.labelsInput, formData.valuesInput, formData.chartType]);

  useEffect(() => {
    if (formData.chartType === "number") {
      setFormData((prev) => ({
        ...prev,
        labelsInput: "",
        valuesInput: "",
      }));
      setChartData([]);
    } else {
      setFormData((prev) => ({
        ...prev,
        numberValue: "",
      }));
    }
  }, [formData.chartType]);

  const updateFormData = (field: keyof ChartFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    setError("");

    if (!formData.chartName.trim()) {
      setError("Chart name is required");
      return false;
    }

    if (formData.chartType === "number") {
      if (formData.numberValue === "" || isNaN(Number(formData.numberValue))) {
        setError("Valid number is required");
        return false;
      }
    } else {
      if (chartData.length === 0) {
        setError("Valid labels and values are required");
        return false;
      }
    }

    return true;
  };

  const getChartDataForSave = () => {
    if (formData.chartType === "number") {
      return { value: Number(formData.numberValue) };
    } else {
      return {
        labels: chartData.map((d) => d.name),
        values: chartData.map((d) => d.value),
      };
    }
  };

  const getPreviewData = () => {
    if (formData.chartType === "number") {
      return formData.numberValue === ""
        ? null
        : { value: Number(formData.numberValue) };
    }
    return chartData;
  };

  const resetForm = () => {
    setFormData({
      chartName: "",
      chartType: "line",
      numberValue: "",
      labelsInput: "",
      valuesInput: "",
    });
    setChartData([]);
    setError("");
  };

  return {
    formData,
    chartData,
    error,
    updateFormData,
    validateForm,
    getChartDataForSave,
    getPreviewData,
    resetForm,
  };
};
