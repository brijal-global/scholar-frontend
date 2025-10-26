import { Tooltip } from "antd";
import React from "react";

const Progress = ({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  // Tooltip
  const tooltips = [
    "Complete your personal and academic information",
    "Apply to your chosen universities",
    "View offers received from universities",
    "Submit your visa application",
    "Track your visa approval status",
    "Make necessary payments",
    "Get assistance for your departure",
  ];
  return (
    <div className="w-fullbg-white rounded-lg my-6">
      <div className="flex items-center justify-between select-none gap-2 w-full overflow-x-auto text-nowrap no-scrollbar">
        {steps?.map((step, index) => {
          return (
            <Tooltip key={index} title={tooltips[index]} placement="top">
              <div
                className={`flex-1 text-center text-sm py-2 px-4 rounded-lg cursor-pointer ${
                  index < currentStep
                    ? "text-[#54A97D] bg-[#F4FFFA] border border-[#BDDECC]"
                    : index === currentStep
                    ? "text-white bg-[#29935C] border border-transparent"
                    : "text-[#838383] bg-[#F3F3F3] border border-[#EBEBEB]"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {step}
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
