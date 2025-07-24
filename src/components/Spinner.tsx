interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className = "" }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-10 h-10 border-5 border-primary-color border-t-transparent rounded-full animate-spin ${className}`}
      ></div>
    </div>
  );
}
