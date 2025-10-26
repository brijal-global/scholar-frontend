import { PrimaryButton, PrimaryOutlineButton } from "@/components/ui/Buttons";
import buildingIllustration from "@/assets/illustrations/building.svg";
import Image from "next/image";
import React from "react";

const Header = ({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="relative overflow-hidden col-span-1 lg:col-span-3 flex justify-between items-start bg-gradient-to-r from-[#F9F9F9] to-[#F2F2F2] border border-[#EBEBEB] rounded-lg p-3 lg:p-6 xl:p-10">
        <div className="flex-1 relative md:z-10">
          <h1 className="text-3xl font-medium text-blackish mb-1">
            Welcome Back, Samir! 👋
          </h1>
          <p className="text-[#838383] mb-10 text-sm">
            You&apos;re one step closer to starting your journey in Korea
          </p>

          <div className="flex gap-4">
            <PrimaryButton title="Complete Visa Application" link="#" />
            <PrimaryOutlineButton
              title="Talk to a consultant"
              link="#"
              className="!text-[#606060] !border-[#B5B5B5] hover:!text-[#606060] hover:!border-[#B5B5B5] hover:!bg-gray-100 !border-1"
            />
          </div>
        </div>

        <Image
          src={buildingIllustration}
          alt="Building Illustration"
          width={300}
          height={300}
          className="absolute bottom-0 right-0 object-cover hidden xl:block"
        />
      </div>

      {/* Progress Circle */}
      <div className="text-center bg-[#F3F3F3] border-[#EBEBEB] border-1 rounded-lg p-3 flex flex-col items-center justify-center gap-2">
        <div className="text-base text-blackish mb-2">
          Step {currentStep + 1} out of {steps.length}
        </div>
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="var(--color-primary-light-2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(currentStep / steps.length) * 100 * 2.01} ${
                100 * 2.01
              }`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">
              {Math.round((currentStep / steps.length) * 100)}%
            </span>
          </div>
        </div>
        <div className="text-xs text-[#838383] mt-1">{steps[currentStep]}</div>
      </div>
    </div>
  );
};

export default Header;
