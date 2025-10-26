"use client";

import PayVisaApplicationFee from "./PayVisaApplicationFee";
import PaymentVerification from "./PaymentVerification";
import Summary_Concent from "./Summary&Concent";
import ApplicationReview from "./ApplicationReview";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import SubmitApplication from "@/components/modals/consultancy/ConfirmApplicationSubmission";
import SuccessfulApplicationSubmission from "@/components/modals/consultancy/SuccessfullApplicationSubmission";

export interface FormStepProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
  handlePrevious: () => void;
  totalSteps: number;
}

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [showSubmitModel, setShowSubmitModel] = useState(false);
  const [showSuccessful, setShowSuccessful] = useState(false);

  const navItems = [
    { id: 1, label: "Pay Visa Application Fee" },
    { id: 2, label: "ApplicationReview Verification" },
    { id: 3, label: "Decelaration and Concent" },
    { id: 4, label: "Application Review" },
  ];

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <PayVisaApplicationFee
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 2:
        return (
          <PaymentVerification
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 3:
        return (
          <Summary_Concent
            step={step}
            setStep={setStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            totalSteps={navItems.length}
          />
        );
      case 4:
        return <ApplicationReview />;
      default:
        return (
          <PayVisaApplicationFee
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

  const handleSubmit = () => {
    setShowSubmitModel(true);
  };

  const handleSuccess = () => {
    setShowSubmitModel(false);
    setShowSuccessful(true);
  };

  return (
    <section>
      {/* Hide this div when the step is 4 */}
      {step != 4 && (
        <nav>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-col w-full mt-5">
              <div className="text-center">
                <h1 className="font-bold text-4xl mb-3">
                  Visa application fee of “Student name”
                </h1>
                <p className="mb-10">
                  Provide accurate details about your consultancy to build trust
                  and connect better with students.
                </p>
                {/* Progress Indicator */}
                <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 mb-5">
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
            </div>
          </div>
        </nav>
      )}
      {/* Show this only when the step is 4  */}
      {step == 4 && (
        <nav>
          <p className="ml-4 text-3xl font-bold mb-3">
            Application review of “Student name”
          </p>
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
                onClick={handleSubmit}
                title="Submit"
                className="rounded-lg "
              />
            </div>
          </div>
        </nav>
      )}
      <main className="py-6 w-full flex justify-center">{renderForm()}</main>
      {/* Submit Application Model */}
      <SubmitApplication
        isOpen={showSubmitModel}
        closeModal={() => setShowSubmitModel(false)}
        action={handleSuccess} // dummy action
      />
      {/* Successfull Submission Model */}
      <SuccessfulApplicationSubmission
        isOpen={showSuccessful}
        closeModal={() => setShowSuccessful(false)}
        action={() => setShowSuccessful(false)} // dummy action
      />
    </section>
  );
}
