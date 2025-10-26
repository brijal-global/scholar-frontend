"use client";
import React, { useState } from "react";
import { Modal } from "antd/lib";
import { PrimaryButton } from "@/components/ui/Buttons";
import { CircleCheck } from "lucide-react";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const handleSubmit = async () => {
  console.log("API called to submit application");
};

const SubmitApplication = ({
  isOpen,
  closeModal,
  action,
}: ModuleModalProps) => {
  const [loading, setLoading] = useState(false); // TODO: Implement loading indicator

  const onSubmitClick = async () => {
    setLoading(true);
    await handleSubmit();
    setLoading(false);
    closeModal();
    action();
  };
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      closeIcon={null}
      centered
      footer={null}
    >
      <div className="flex flex-col gap-2">
        <p>
          <CircleCheck className="border-[#EDFEEA] bg-[#C7FFCA] border-2 text-[#00BF03] rounded-full" />
        </p>
        <p>Confirm Application Submission</p>
        <p>
          Are you sure you want to submit this application? The admin will
          review your documents before sending it to the university.
        </p>

        {/* Submit buttons */}
        <div className="flex gap-4">
          <PrimaryButton
            title="Back"
            onClick={closeModal}
            className="!bg-[#EDEDED] !text-[#000]"
          />{" "}
          <PrimaryButton
            title={loading ? "Submitting" : "Submit"}
            onClick={onSubmitClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SubmitApplication;
