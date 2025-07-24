"use client";

import { useState } from "react";
import ChartFormInputs from "@/components/ChartFormInputs";
import { Chart, ChartType } from "@/types/chart";

export interface ChartData {
  value?: number;
  labels?: string[];
  values?: number[];
}

interface ChartEditFormProps {
  id: string;
  dashboardId: string;
  type: ChartType;
  title: string;
  data: ChartData;
  onSave: (updatedChart: Chart) => void;
}

export default function ChartEditForm({
  id,
  dashboardId,
  type: initialType,
  title: initialTitle,
  data: initialData,
  onSave,
}: ChartEditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [chartType, setChartType] = useState<ChartType>(initialType);

  const [numberValue, setNumberValue] = useState<number | "">(
    initialData.value ?? ""
  );
  const [labelsInput, setLabelsInput] = useState(
    initialData.labels ? initialData.labels.join(", ") : ""
  );
  const [valuesInput, setValuesInput] = useState(
    initialData.values ? initialData.values.join(", ") : ""
  );

  const [error, setError] = useState("");

  const handleChartTypeChange = (value: ChartType) => {
    setChartType(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let newData: ChartData = {};

    if (chartType === "number") {
      const val = Number(numberValue);
      if (isNaN(val)) {
        setError("Please enter a valid number");
        return;
      }
      newData.value = val;
    } else {
      const labels = labelsInput
        .split(",")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      const values = valuesInput
        .split(",")
        .map((v) => Number(v.trim()))
        .filter((v) => !isNaN(v));

      if (labels.length === 0 || values.length === 0) {
        setError("Labels and values cannot be empty");
        return;
      }
      if (labels.length !== values.length) {
        setError("Labels and values must have the same length");
        return;
      }

      newData.labels = labels;
      newData.values = values;
    }

    onSave({ id, dashboardId, type: chartType, title, data: newData });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg mx-auto space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-information-color mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-information-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent transition"
          placeholder="Enter chart title"
          required
        />
      </div>

      <ChartFormInputs
        chartName={title}
        chartType={chartType}
        numberValue={numberValue}
        labelsInput={labelsInput}
        valuesInput={valuesInput}
        error={error}
        isLoading={false}
        onChartNameChange={setTitle}
        onChartTypeChange={handleChartTypeChange}
        onNumberValueChange={setNumberValue}
        onLabelsInputChange={setLabelsInput}
        onValuesInputChange={setValuesInput}
      />

      {error && (
        <div className="text-error-color text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-primary-color px-6 py-2 text-white font-semibold hover:bg-primary-color-hover focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-1 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
