/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FormStepProps } from "./Dashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
interface demoData {
  id: string;
  studentName: string;
  paymentDate: string;
}
const PaymentDetails: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  const mockData: demoData[] = [
    {
      id: "1",
      studentName: "Saman Maharjan",
      paymentDate: "25th March 2025",
    },
  ];

  return (
    <>
      <section className="w-2xl p-5 rounded-sm mb-10">
        {/* Visa Application */}
        <div>
          {mockData.map((item) => (
            <div
              key={item.id}
              className="text-sm mb-4 p-3 rounded-lg border border-gray-200 bg-[#F8FFFB]"
            >
              <p className="text-[#606060]">Visa application summary</p>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Sudent Full Name:</p>
                <p> {item.studentName}</p>
              </div>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Payment Date: </p>
                <p>{item.paymentDate}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Decleration and Concent */}
        <section className="flex flex-col gap-4">
          <p className="font-bold">Declaration & Consent</p>
          <div style={{ color: "var(--color-grayish)" }} className="flex gap-2">
            <input
              type="checkbox"
              name="contentTrue"
              id="contentTrue"
              className="focus:outline-none"
            />
            <label htmlFor="contentTrue" className="select-none">
              I confirm that all information provided in this application is
              true, accurate, and complete to the best of my knowledge.
            </label>
          </div>
          <div style={{ color: "var(--color-grayish)" }} className="flex gap-2">
            <input
              type="checkbox"
              name="agreeCondition"
              id="agreeCondition"
              className="focus:outline-none"
            />
            <label htmlFor="agreeCondition" className="select-none">
              I agree to the Terms and Conditions and Privacy Policy of Scholar.
            </label>
          </div>
          <div style={{ color: "var(--color-grayish)" }} className="flex gap-2">
            <input
              type="checkbox"
              name="shareConcent"
              id="shareConcent"
              className="focus:outline-none"
            />
            <label htmlFor="shareConcent" className="select-none ">
              I consent to Scholar sharing my application data and uploaded
              documents with the selected university for admission purposes.
            </label>
          </div>
        </section>

        {/* Navigation */}
        <div className="grid grid-cols-2 mt-10">
          <PrimaryButton
            onClick={handlePrevious}
            title="Back"
            className="rounded-lg !bg-[#fff] !text-[#000]"
          />
          <PrimaryButton
            onClick={handleNext}
            title="Next"
            className="rounded-lg"
          />
        </div>
      </section>
    </>
  );
};
export default PaymentDetails;
