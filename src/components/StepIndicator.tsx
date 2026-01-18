import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`mx-1 h-2 flex-1 rounded-full ${
              i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-blue-600">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
};
