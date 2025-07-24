import DynamicChart from "@/components/DynamicChart";
import { Pencil, Trash2 } from "lucide-react";

interface ChartItemProps {
  id: string;
  type: "bar" | "line" | "number";
  title: string;
  data: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ChartItem({
  id,
  type,
  title,
  data,
  onEdit,
  onDelete,
}: ChartItemProps) {
  let chartData;

  if (type === "number") {
    chartData = typeof data?.value === "number" ? { value: data.value } : null;
  } else if (
    Array.isArray(data?.labels) &&
    Array.isArray(data?.values) &&
    data.labels.length === data.values.length
  ) {
    chartData = data.labels.map((label: string, i: number) => ({
      name: label,
      value: data.values[i] ?? 0,
    }));
  } else {
    chartData = [];
  }

  return (
    <div className="flex flex-col mb-12 border p-4 rounded shadow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="flex justify-end gap-2 mt-auto">
          <button
            onClick={() => onEdit(id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-edit-color rounded hover:bg-edit-hover-color transition"
            aria-label={`Edit chart ${title}`}
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-error-color rounded hover:bg-error-color-hover transition"
            aria-label={`Delete chart ${title}`}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <DynamicChart chartType={type} data={chartData} />
    </div>
  );
}
