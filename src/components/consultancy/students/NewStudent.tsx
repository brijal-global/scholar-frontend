"use client";

import PersonalInformation from "./personalInformation";
import Address from "./Address";
import EducationalBackground from "./EducationalBackground";
import TestScore from "./TestScore";
import VisaHistory from "./VisaHistory";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

export interface FormStepProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
  handlePrevious: () => void;
  totalSteps: number;
}

export default function ProfileSetup() {
  const [step, setStep] = useState(1);

  const navItems = [
    { id: 1, label: "Personal Information" },
    { id: 2, label: "Address and Contact" },
    { id: 3, label: "Educational Background" },
    { id: 4, label: "English Proficiency Test" },
    { id: 5, label: "Final Submission" },
  ];

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInformation
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 2:
        return (
          <Address
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 3:
        return (
          <EducationalBackground
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 4:
        return (
          <TestScore
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 5:
        return (
          <VisaHistory
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      default:
        return (
          <PersonalInformation
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
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
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col w-full mt-10">
          <div className="text-center">
            <h1 className="font-bold text-4xl mb-3">Add New Student</h1>
            <p className="mb-10">
              Provide student details to personalize the application process.
            </p>
            {/* Progress Indicator */}
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 mb-5">
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
          </div>
          <main className="py-6 w-fullPre departure flex justify-center">
            {renderForm()}
          </main>
        </div>
      </div>
    </section>
  );
}
