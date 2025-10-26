"use client";
import SelectStudent from "./SelectStudent";
import SelectProgram from "./SelectProgram";
import SelectUniversity from "./SelectUniversity";
import UploadDocument from "./UploadDocument";
import AdditionalDocument from "./AdditionalDocument";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function UniversityApplicationDashboard() {
  const [step, setStep] = useState(1);

  const navItems = [
    { id: 1, label: "Select Student" },
    { id: 2, label: "Select University for Student" },
    { id: 3, label: "Select Program for Student" },
    { id: 4, label: "Upload Documents of Student" },
    { id: 5, label: "Additional Documents of Student" },
  ];

  const currentPageLabel = navItems.find((item) => item.id === step)?.label;

  const renderForm = () => {
    switch (step) {
      case 1:
        return <SelectStudent />;
      case 2:
        return <SelectUniversity />;
      case 3:
        return <SelectProgram />;
      case 4:
        return <UploadDocument />;
      case 5:
        return <AdditionalDocument />;
      default:
        return <SelectStudent />;
    }
  };

  const handleNext = () => {
    if (step < navItems.length) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="w-full h-full">
      {/* Navigation */}
      <nav>
        <p className="ml-4 text-xl font-bold mb-3">{currentPageLabel}</p>
        <div className="flex items-center justify-between mb-10">
          {/* Progress Indicator */}
          <div className="flex flex-col w-full max-w-xl px-4">
            <div className="w-full flex justify-between">
              <p className="text-xs sm:text-sm text-gray-600">
                Step {step} of {navItems.length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {Math.round((step / navItems.length) * 100)}% Complete
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mt-2">
              <div
                className="bg-green-600 h-2 sm:h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / navItems.length) * 100}%` }}
              ></div>
            </div>
          </div>
          {/* Navigation  */}
          <div className="flex justify-between">
            {step > 1 && (
              <PrimaryButton
                onClick={handlePrevious}
                title="Back"
                className="rounded-lg !bg-white !text-black"
              />
            )}
            <PrimaryButton
              onClick={handleNext}
              title="Next"
              className="rounded-lg "
            />
          </div>
        </div>
      </nav>
      <main>{renderForm()}</main>
    </section>
  );
}
