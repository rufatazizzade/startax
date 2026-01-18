import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {[...Array(totalSteps)].map((_, i) => (
          <React.Fragment key={i}>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i + 1 <= currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-200 text-secondary-600'
              }`}
            >
              {i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`h-0.5 w-8 ${
                  i + 1 < currentStep ? 'bg-primary-600' : 'bg-secondary-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-sm font-medium text-secondary-600">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};
