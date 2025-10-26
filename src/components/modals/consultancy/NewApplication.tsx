"use client";
import React from "react";
import { Modal } from "antd/lib";
import Link from "next/link";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const NewApplication = ({ isOpen, closeModal }: ModuleModalProps) => {
  return (
    <Modal open={isOpen} onCancel={closeModal} closable centered footer={null}>
      <div>
        <div className="text-center mb-3">
          <p className="font-bold text-lg">Select Application Type</p>
          <p>
            Please choose the type of application you want to create. This helps
            us show the correct fields and workflow.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F7F7F7] border-[#EBEBEB] rounded-lg px-5 text-center py-5 md:py-10">
            <Link href="/consultancy/applications/university-application">
              <p className="text-[#258654] font-bold text-base">
                University Application
              </p>
              <p className="text-[#606060] text-center">
                Submit student documents and payment to the university.
              </p>
            </Link>
          </div>

          <div className="bg-[#F7F7F7] border-[#EBEBEB] rounded-lg px-5 text-center py-5 md:py-10">
            <Link href="/consultancy/applications/visa-application">
              <p className="text-[#258654] font-bold text-center text-base">
                Visa Application
              </p>
              <p className="text-[#606060] text-center">
                Submit student documents and payment to the university.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewApplication;
