import PrimaryButton from "@/components/PrimaryButton";
import Spinner from "./Spinner";

interface ChartFormActionsProps {
  mode: "create" | "configure";
  isLoading: boolean;
  showBackButton: boolean;
  onBack: () => void;
}

export default function ChartFormActions({
  mode,
  isLoading,
  showBackButton,
  onBack,
}: ChartFormActionsProps) {
  const buttonText = mode === "configure" ? "Create" : "Save Chart";
  const loadingText = mode === "configure" ? "Creating..." : "Saving...";

  return (
    <div
      className={`flex ${
        showBackButton ? "justify-between" : "justify-end"
      } gap-4 mt-6`}
    >
      {showBackButton && (
        <PrimaryButton type="button" onClick={onBack} disabled={isLoading}>
          Previous
        </PrimaryButton>
      )}
      <PrimaryButton
        type="submit"
        disabled={isLoading}
        className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Spinner className="w-4 h-4 border-2" />
            {loadingText}
          </span>
        ) : (
          buttonText
        )}
      </PrimaryButton>
    </div>
  );
}
