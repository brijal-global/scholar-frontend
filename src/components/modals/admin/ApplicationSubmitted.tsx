"use client";
import { Modal } from "antd/lib";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

interface ModuleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
}

const SuccessSubmission = ({ isOpen, closeModal }: ModuleModalProps) => {
  return (
    <Modal open={isOpen} onCancel={closeModal} centered footer={null}>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p>
          <CircleCheck className="border-[#EDFEEA] bg-[#C7FFCA] border-2 text-[#00BF03] rounded-full" />
        </p>
        <p className="font-bold text-xl">🎉 Application Submitted!</p>
        <p>
          Visa Application of James Maharjan has been successfully submitted.{" "}
        </p>
        <p>
          We&apos;ll notify you as soon as there&apos;s an update from the
          ambessy.
        </p>

        {/* Submit buttons */}
        <Link
          href="/admin/dashboard"
          className="!bg-primary w-full !text-center hover:bg-primary-dark !text-white px-4 py-3 rounded-md cursor-pointer font-medium  transition-colors max-md:w-full"
        >
          Go to Dashboard{" "}
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessSubmission;
