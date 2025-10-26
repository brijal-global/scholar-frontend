"use client";
import { FormStepProps } from "./Dashboard";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Button } from "antd";
import { Upload } from "lucide-react";
import PaymentSubmitted from "@/components/modals/consultancy/PaymentSubmitted";
const PaymentDetails: React.FC<FormStepProps> = ({
  handleNext,
  handlePrevious,
}) => {
  const [showPaymentSubmitted, setshowPaymentSubmitted] = useState(false);

  const handlePaymentSubmitted = () => {
    setshowPaymentSubmitted(true);
  };
  return (
    <>
      <section className="w-2xl p-5 rounded-sm mb-10">
        <h2 className="font-bold mb-5">Payment Verification</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-grayish)" }}>
          Upload a screenshot or photo of your payment receipt/confirmation.
        </p>
        <form>
          {/* Upload File */}
          <div>
            <label htmlFor="uploadFile" className="block mb-2">
              Upload File (PDF, JPG, Max 10MB)
            </label>
            <div className="h-35">
              <Button
                color="green"
                variant="dashed"
                className="w-full"
                style={{ height: "100%", backgroundColor: "#F7FFFB" }}
              >
                <p>
                  <Upload />
                </p>
                <p>Click to Upload</p>
              </Button>
            </div>
          </div>
          {/* Transaction ID */}
          <div>
            <label
              htmlFor="Transaction_ID"
              className="block font-medium mb-2 mt-4"
              style={{ color: "var(--color-grayish)" }}
            >
              Transaction ID / Notes (Optional)
            </label>
            <input
              type="text"
              id="Transaction_ID"
              placeholder="Any Remarks"
              className={`w-full bg-white rounded-lg p-4 border border-[#F1F1F1] placeholder-black`}
            />
          </div>
        </form>

        {/* Navigation */}
        <div className="grid grid-cols-2 mt-10">
          <PrimaryButton
            onClick={handlePrevious}
            title="Back"
            className="rounded-lg !bg-[#fff] !text-[#000]"
          />
          <PrimaryButton
            onClick={handlePaymentSubmitted}
            title="Submit"
            className="rounded-lg"
          />
        </div>
        {/* Model for AddStudent */}
        <PaymentSubmitted
          isOpen={showPaymentSubmitted}
          closeModal={() => setshowPaymentSubmitted(false)}
          handleNext={handleNext}
        />
      </section>
    </>
  );
};
export default PaymentDetails;
