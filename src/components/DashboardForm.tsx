"use client";
import InputBox from "@/components/InputBox";
import PrimaryButton from "@/components/PrimaryButton";
import { useDashboardForm } from "@/hook/useDashboardForm";
import Spinner from "./Spinner";
export default function DashboardForm() {
  const { dashboardName, setDashboardName, error, isLoading, handleSubmit } =
    useDashboardForm();

  return (
    <section className="w-full  mx-auto animate-fadeUp mt-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputBox
            id="dashboard-name"
            label="Dashboard Name"
            placeholder="Enter dashboard name"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            disabled={isLoading}
            aria-describedby={
              error ? "dashboard-name-error" : "dashboard-name-tip"
            }
            aria-invalid={!!error}
          />
          {error && (
            <div
              id="dashboard-name-error"
              className="text-error-color text-sm mt-1"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}
        </div>

        <span
          id="dashboard-name-tip"
          className="font-light text-md block text-information-color"
        >
          TIP: Choose a name that describes what this dashboard will track
        </span>

        <div className="flex justify-end w-full mt-5">
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isLoading ? <Spinner /> : "Create"}
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}
