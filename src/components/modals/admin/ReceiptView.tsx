"use client";
import React, { useState } from "react";
import { Modal } from "antd/lib";
import { PrimaryButton } from "@/components/ui/Buttons";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const handleSave = async () => {
  console.log("API called");
};

const ReceiptView = ({ isOpen, closeModal, action }: ModuleModalProps) => {
  const [loading, setLoading] = useState(false);

  const onViewClicked = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleSave();
    setLoading(false);
    closeModal();
    action();
  };
  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Receipt"
      centered
      footer={null}
    >
      <form>
        <div className="flex flex-col space-y-4">
          <Image
            src={ImageIcon}
            alt="Transcript Image"
            style={{ height: "15rem", width: "100%" }}
          />
          <div>
            <label htmlFor="documentType" className="block font-medium mb-2">
              Rejected Reason (If rejected)
            </label>
            <textarea
              name="additionalNotes"
              id="additionalNotes"
              cols={30}
              rows={5}
              className="w-full bg-white rounded-lg p-4 border border-gray-300 h-14"
              placeholder="e.g. Rejected due to missing financial documents"
            />
          </div>
          {/* Submit buttons */}
          <div className="flex justify-between">
            <PrimaryButton
              title="Cancel"
              onClick={closeModal}
              className="!bg-[#EDEDED] !text-[#000]"
            />{" "}
            <div className="flex gap-4">
              <PrimaryButton
                title="Rejected"
                onClick={onViewClicked}
                className="!text-[#DE310A] border border-[#DE310A] !bg-[#fff]"
              />
              <PrimaryButton
                title={loading ? "Submitting" : "Verified"}
                onClick={onViewClicked}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ReceiptView;
