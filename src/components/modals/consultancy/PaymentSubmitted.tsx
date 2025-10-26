"use client";
import React from "react";
import { Modal } from "antd/lib";
import { PrimaryButton } from "@/components/ui/Buttons";
import { CircleCheck } from "lucide-react";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleNext: () => void;
}

const PaymentSubmitted: React.FC<ModuleModalProps> = ({
  isOpen,
  closeModal,
  handleNext,
}) => {
  return (
    <Modal open={isOpen} onCancel={closeModal} centered footer={null}>
      <div className="flex flex-col gap-2">
        <p>
          <CircleCheck className="border-[#EDFEEA] bg-[#C7FFCA] border-2 text-[#00BF03] rounded-full" />
        </p>
        <p className="font-bold">Payment Submitted!</p>
        <p className="text-[#606060]">
          We have received your payment receipt. We will review it and update
          you in a few hours.
        </p>
        <PrimaryButton
          title="Next"
          className="rounded-lg !w-3xs"
          onClick={() => {
            handleNext();
            closeModal();
          }}
        />
      </div>
    </Modal>
  );
};

export default PaymentSubmitted;
