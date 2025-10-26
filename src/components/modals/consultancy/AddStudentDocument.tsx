/* eslint-disable @typescript-eslint/no-unused-vars */
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

const AddStudentDocument = ({
  isOpen,
  closeModal,
  action,
}: ModuleModalProps) => {
  const [loading, setLoading] = useState(false);

  const onSaveClick = async () => {
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
      title="Upload New Document"
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
              Choose document type
            </label>
            <div>
              <select
                id="documentType"
                className={`appearance-none w-full bg-white rounded-lg h-14 p-4 border border-gray-300 text-gray-600`}
                defaultValue="Nepal"
                disabled
              >
                <option value="" disabled>
                  --Select Document Type--
                </option>
                <option value="Nepal" className="text-gray-600">
                  Nepal
                </option>
                <option value="India" className="text-gray-600">
                  India
                </option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="uploadFile" className="block">
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
          {/* Submit buttons */}
          <div className="flex gap-4">
            <PrimaryButton
              title="Cancel"
              onClick={closeModal}
              className="!bg-[#EDEDED] !text-[#000]"
            />{" "}
            <PrimaryButton title="Submit" onClick={onSaveClick} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddStudentDocument;
