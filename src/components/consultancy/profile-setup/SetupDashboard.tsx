/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import BasicInformation from "./BasicInformation";
import Address from "./Address";
import OperationalDetails from "./OperationalDetails";
import Payment from "./PaymentDetails";
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
    { id: 1, label: "Basic Information" },
    { id: 2, label: "Address & Location" },
    { id: 3, label: "Operational Details" },
    { id: 4, label: "Bank & Payment Details" },
  ];

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <BasicInformation
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
          <OperationalDetails
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 4:
        return (
          <Payment
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      default:
        return (
          <BasicInformation
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
    }
  };

  const handleNavClick = (id: number) => {
    setStep(id);
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
        <div className="flex flex-col w-full mt-5">
          <div className="text-center">
            <h1 className="font-bold text-4xl mb-3">
              Complete Your Consultancy Profile
            </h1>
            <p className="mb-10">
              Provide accurate details about your consultancy to build trust and
              connect better with students.
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
          <main className="py-6 w-full flex justify-center">
            {renderForm()}
          </main>
        </div>
      </div>
    </section>
  );
}
