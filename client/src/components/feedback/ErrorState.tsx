import { AlertTriangle, RotateCcw } from "lucide-react";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-16 px-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FDEDED] mb-6">
        <AlertTriangle size={28} color="#D14343" />
      </div>
      <h3 className="text-[#131D21] font-[Inter] font-semibold text-[1.25em] mb-2">
        Something went wrong
      </h3>
      <p className="text-[#586062] font-[Inter] font-normal text-[0.95em] max-w-[24em] mb-6">
        {message || "We couldn't load your orders right now. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-[#416465] text-white px-6 py-2.5 rounded-lg font-[Inter] font-semibold text-[0.9em] cursor-pointer transition-colors duration-300 hover:bg-[#354f4f]"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;