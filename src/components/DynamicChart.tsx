import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartType } from "@/constants/chartTypes";

interface Props {
  chartType: ChartType;
  data: any;
  className?: string;
}

export default function DynamicChart({ chartType, data, className }: Props) {
  console.log("chart.data", data);

  if (chartType === "number") {
    const value =
      typeof data === "object" &&
      data !== null &&
      "value" in data &&
      typeof data.value === "number"
        ? data.value
        : "No data";
    return (
      <div className={`text-3xl font-bold ${className ?? ""}`}>{value}</div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className={`text-error-color ${className ?? ""}`}>
        Error: Invalid chart data
      </div>
    );
  }

  return (
    <div
      className={`w-full sm:max-w-[300px] md:max-w-[600px] lg:max-w-full ${
        className ?? ""
      }`}
    >
      <ResponsiveContainer width="100%" height={500}>
        {chartType === "bar" ? (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#15D798" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#15D798"
              strokeWidth={3}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
