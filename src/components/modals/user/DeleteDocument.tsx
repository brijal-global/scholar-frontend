"use client";
import React, { useState } from "react";
import { Modal } from "antd/lib";
import { CircleAlert } from "lucide-react";
import { PrimaryButton } from "@/components/ui/Buttons";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const handleDelete = async () => {
  alert("API called to deleted student");
  console.log("API called");
};

const DeleteDocument = ({ isOpen, closeModal, action }: ModuleModalProps) => {
  const [loading, setLoading] = useState(false); // TODO: Implement loading indicator

  const onDeleteClick = async () => {
    setLoading(true);
    await handleDelete();
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
        <CircleAlert className="text-[#D92D20] bg-[#FEE4E2] border border-[#FEF3F2] rounded-full" />
        <p className="text-bold">Delete file?</p>
        <p>
          Are you sure you want to delete this student? This action cannot be
          undone.
        </p>
      </div>
      {/* Submit buttons */}
      <div className="flex gap-4">
        <PrimaryButton
          title="Cancel"
          onClick={closeModal}
          className="!bg-[#EDEDED] !text-[#000]"
        />{" "}
        <PrimaryButton
          title={loading ? "Submitting" : "Submit"}
          onClick={onDeleteClick}
          className="!bg-[#D92D20]"
        />
      </div>
    </Modal>
  );
};

export default DeleteDocument;
