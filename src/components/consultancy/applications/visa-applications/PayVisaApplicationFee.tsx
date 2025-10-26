
"use client";
import { FormStepProps } from "./Dashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import Link from "next/link";
import QRCodeDisplay from "./QRCodeDisplay";
interface demoData {
  id: string;
  studentName: string;
  paymentDate: string;
  totalAmount: string;
}
const PaymentDetails: React.FC<FormStepProps> = ({ handleNext }) => {
  const mockData: demoData[] = [
    {
      id: "1",
      studentName: "Saman Maharjan",
      paymentDate: "25th March 2025",
      totalAmount: "NPR 13992.87 ($100.00)",
    },
  ];
  const [selected, setSelected] = useState<"FonePay" | "Khalti" | "Esewa">(
    "Esewa"
  );
  const handleButtonClick = (type: "FonePay" | "Khalti" | "Esewa") => {
    setSelected(type);
  };

  return (
    <>
      <section className="w-2xl p-5 rounded-sm mb-10">
        <h2 className="font-bold text-center mb-5">Pay Visa Application Fee</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Please pay the visa application fee. This fee is non-refundable.
        </p>
        {/* Payment */}
        <div>
          {mockData.map((item) => (
            <div
              key={item.id}
              className="text-sm mb-4 p-3 rounded-lg border border-gray-200"
            >
              <p className="text-[#606060]">Payment Summary</p>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Sudent Full Name:</p>
                <p> {item.studentName}</p>
              </div>
              <div className="text-[#838383] flex items-center justify-between mt-2">
                <p>Payment Date: </p>
                <p>{item.paymentDate}</p>
              </div>
              <div className="text-[#29935C] font-bold text-lg flex items-center justify-between mt-2">
                <p>Total Amount:</p> <p>{item.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Payment Options */}
        <div className="relative max-md:col-span-2 bg-gray-100 flex p-1.5 rounded-md gap-1.5">
          <button
            onClick={() => handleButtonClick("FonePay")}
            className={`rounded-md p-2 w-full text-sm text-center ${
              selected === "FonePay" ? "bg-[#29935C] text-white" : ""
            }`}
          >
            <p>FonePay</p>
          </button>
          <button
            onClick={() => handleButtonClick("Khalti")}
            className={`rounded-md p-2 pr-4 pt-2 pd-2 w-full text-sm text-center ${
              selected === "Khalti" ? "bg-[#29935C] text-white" : ""
            }`}
          >
            <p>Khalti</p>
          </button>
          <button
            onClick={() => handleButtonClick("Esewa")}
            className={`rounded-md p-2 pr-4 pt-2 pd-2 w-full text-sm text-center ${
              selected === "Esewa" ? "bg-[#29935C] text-white" : ""
            }`}
          >
            <p>Esewa</p>
          </button>
        </div>

        {/* Render Icon according to the selected payment option */}
        <QRCodeDisplay paymentOption={selected} />
        {/* Navigation */}
        <div className="grid grid-cols-2 mt-10">
          <Link
            href="/consultancy/applications"
            className="rounded-lg p-4 text-sm cursor-pointer gap-2 ml-5 text-center"
          >
            Back
          </Link>
          <PrimaryButton
            onClick={handleNext}
            title="I’ve completed the payment"
            className="rounded-lg"
          />
        </div>
      </section>
    </>
  );
};
export default PaymentDetails;
