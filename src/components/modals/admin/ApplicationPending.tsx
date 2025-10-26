"use client";
import React, { useState } from "react";
import { Modal } from "antd/lib";
import { Button } from "antd";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Upload } from "lucide-react";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const handleSave = async () => {
  alert("API called to save student document");
  console.log("API called");
};

const StatusPending = ({ isOpen, closeModal, action }: ModuleModalProps) => {
  const [loading, setLoading] = useState(false);

  const onSendClick = async (e: React.FormEvent) => {
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
      title={<span className="text-[#5073FF]">Application Pending</span>}
      centered
      footer={null}
    >
      <form>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="documentType"
              className="block font-medium mb-2"
              style={{ color: "var(--color-grayish)" }}
            >
              Pending Reason
            </label>
            <textarea
              name="additionalNotes"
              id="additionalNotes"
              cols={30}
              rows={5}
              className="w-full bg-white rounded-lg p-4 border border-gray-300 "
              placeholder="e.g. Rejected due to missing financial documents"
            />
          </div>
          <div>
            <label htmlFor="uploadFile" className="block">
              Attachment File (PDF, JPG, Max 10MB)
            </label>
            <div className="h-35">
              <Button
                color="blue"
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
          {/* Submit buttons */}
          <div className="flex gap-4">
            <PrimaryButton
              title="Cancel"
              onClick={closeModal}
              className="!bg-[#EDEDED] !text-[#000]"
            />{" "}
            <PrimaryButton
              title={loading ? "Submitting" : "Send"}
              onClick={onSendClick}
              className="!bg-[#5073FF]"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default StatusPending;
