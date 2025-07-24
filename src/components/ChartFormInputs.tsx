import InputBox from "@/components/InputBox";
import DropdownSelect from "@/components/DropdownSelect";
import { CHART_TYPES, ChartType } from "@/constants/chartTypes";

interface ChartFormInputsProps {
  chartName: string;
  chartType: ChartType;
  numberValue: number | "";
  labelsInput: string;
  valuesInput: string;
  error: string;
  isLoading: boolean;
  onChartNameChange: (value: string) => void;
  onChartTypeChange: (value: ChartType) => void;
  onNumberValueChange: (value: number | "") => void;
  onLabelsInputChange: (value: string) => void;
  onValuesInputChange: (value: string) => void;
}

export default function ChartFormInputs({
  chartName,
  chartType,
  numberValue,
  labelsInput,
  valuesInput,
  error,
  isLoading,
  onChartNameChange,
  onChartTypeChange,
  onNumberValueChange,
  onLabelsInputChange,
  onValuesInputChange,
}: ChartFormInputsProps) {
  return (
    <>
      <div>
        <InputBox
          id="chart-name"
          label="Chart Name"
          placeholder="Enter Chart Name"
          value={chartName}
          onChange={(e) => onChartNameChange(e.target.value)}
          disabled={isLoading}
          aria-describedby={error ? "chart-name-error" : undefined}
          aria-invalid={!!error}
        />
        {error && (
          <div
            id="chart-name-error"
            className="text-red-500 text-sm mt-1"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>

      <DropdownSelect
        id="chart-type"
        label="Chart Type"
        options={CHART_TYPES}
        value={chartType}
        onChange={(e) => onChartTypeChange(e.target.value as ChartType)}
        disabled={isLoading}
      />

      {chartType === "number" ? (
        <InputBox
          id="number-value"
          label="Number Value"
          placeholder="Enter a number"
          type="number"
          value={numberValue}
          onChange={(e) =>
            onNumberValueChange(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          disabled={isLoading}
        />
      ) : (
        <>
          <InputBox
            id="labels-input"
            label="Labels (comma separated)"
            placeholder="e.g. North America, Europe, Asia"
            value={labelsInput}
            onChange={(e) => onLabelsInputChange(e.target.value)}
            disabled={isLoading}
          />
          <InputBox
            id="values-input"
            label="Values (comma separated)"
            placeholder="e.g. 120, 95, 180"
            value={valuesInput}
            onChange={(e) => onValuesInputChange(e.target.value)}
            disabled={isLoading}
          />
        </>
      )}
    </>
  );
}
