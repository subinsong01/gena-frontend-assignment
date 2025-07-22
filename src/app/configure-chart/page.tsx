"use client";

import PrimaryButton from "@/components/PrimaryButton";
import DropdownSelect from "@/components/DropdownSelect";
import InputBox from "@/components/InputBox";
import { CHART_TYPES } from "@/constants/chartTypes";
import { DATA_SOURCES } from "@/constants/dataSource";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfigureChart() {
  const searchParams = useSearchParams();
  const dashboardName = searchParams.get("name");
  const router = useRouter();

  const goToPreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <section className="w-full max-w-xl mx-auto animate-fadeUp mt-6">
      {dashboardName && (
        <h2 className="text-xl font-semibold mb-10">
          <span className="text-4xl text-primary-color">{dashboardName}</span>
        </h2>
      )}
      <div className="flex flex-col gap-4">
        <InputBox
          id="chart-name"
          label="Chart Name"
          placeholder="Enter Chart Name"
        />
        <DropdownSelect
          id="chart-type"
          label="Chart Type"
          options={CHART_TYPES}
        />
        <DropdownSelect
          id="data-source"
          label="Data Source"
          options={DATA_SOURCES}
        />
        <div className="flex justify-between gap-4 mt-6">
          <PrimaryButton type="button" onClick={goToPreviousPage}>
            previous
          </PrimaryButton>
          <PrimaryButton type="submit">create</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
