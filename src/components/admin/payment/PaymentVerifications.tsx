"use client";

import { MoreVertical, View } from "lucide-react";
import Image from "next/image";
import ImageIcon from "@/assets/illustrations/UnknownImage.svg";
import { PrimaryButton, SecondaryOutlineButton } from "@/components/ui/Buttons";
import { useState } from "react";
import ReceiptView from "@/components/modals/admin/ReceiptView";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { BsQuestionCircle } from "react-icons/bs";

export default function PaymentVerification() {
  const demoDataApplication = {
    ApplicantName: "James Maharjan",
    PasswordNumber: "PA024342",
    University: "Yonsei University",
    Program: "Business Administration (Graduate)",
    Intake: "March 2025",
    TuitionFee: "$4000 per semester",
  };

  const demoData = {
    University: "Yonsei University",
    Program: "Business Administration (Graduate)",
  };

  const [showReceipt, setShowReceipt] = useState(false);

  const onViewClicked = () => {
    setShowReceipt(true);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <button className="text-[#838383] my-2" onClick={onViewClicked}>
          <View className="inline" /> View Document
        </button>
      ),
      key: "0",
    },
  ];
  return (
    <section className="ml-5">
      <h1 className="font-bold text-xl">Payment Verification</h1>
      {/* User Details */}
      <section className="px-5 rounded-sm">
        {/* Applicant Information */}
        <div className="bg-[#F8FFFB] rounded-sm p-5 mb-4">
          <h2>Application Summary</h2>
          <div className="text-sm text-[#838383] flex flex-col space-y-2 mt-2">
            <div className="flex justify-between">
              <p>Applicant Name:</p>
              <p>{demoDataApplication.ApplicantName}</p>
            </div>
            <div className="flex justify-between">
              <p>Passport Number:</p>
              <p>{demoDataApplication.PasswordNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>University:</p>
              <p>{demoDataApplication.University}</p>
            </div>
            <div className="flex justify-between">
              <p>Program:</p>
              <p>{demoDataApplication.Program}</p>
            </div>
            <div className="flex justify-between">
              <p>Intake:</p>
              <p>{demoDataApplication.Intake}</p>
            </div>
            <div className="flex justify-between">
              <p>Tuttion Fee:</p>
              <p>{demoDataApplication.TuitionFee}</p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-[#258654]">Personal Information</h3>
        <form className="mt-4 mb-10 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="James"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                placeholder="Maharjan"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="citizenship"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                placeholder="2000/01/02"
                disabled
              />
            </div>
          </div>
        </form>
        <h3 className="font-semibold text-[#258654] mt-4">
          Consultancy Information
        </h3>
        <form className="mt-4 text-sm mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Row */}
            <div>
              <label
                htmlFor="acencyName"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Agency Name
              </label>
              <input
                type="text"
                id="acencyName"
                placeholder="ABC Consultancy"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="contactPerson"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Person <BsQuestionCircle className="inline" />
              </label>
              <input
                type="text"
                id="contactPerson"
                placeholder="PA0123456"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block font-medium mb-2"
                style={{ color: "var(--color-grayish)" }}
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                placeholder="Contact Number"
                className="w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black"
                disabled
              />
            </div>
          </div>
        </form>
        <hr className="text-[#B5B5B5]" />
      </section>

      {/* Payment verification */}
      <section className="p-5 rounded-sm mb-10">
        <h3 className="text-[#258654] font-bold mb-2">Payment Verification</h3>
        {/* Payment Summary */}
        <div className="rounded-lg p-5 mb-4 border border-gray-300">
          <p className="text-[#606060]">Payment Summary</p>
          <div className="text-sm text-[#838383] flex flex-col space-y-2 mt-2">
            <div className="flex justify-between">
              <p>University:</p>
              <p>{demoData.University}</p>
            </div>
            <div className="flex justify-between">
              <p>Program:</p>
              <p>{demoData.Program}</p>
            </div>
            <hr className="text-[#E1E1E199] w-1/3" />
          </div>
          <div className="text-[#29935C] font-bold text-lg flex items-center justify-between mt-2">
            <p>Total Amount:</p>
            <p>NPR 13992.87 ($100.00)</p>
          </div>
        </div>
        <hr className="text-[#B5B5B5]" />

        <form className="my-4 text-sm">
          <div className="flex flex-col space-y-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Receipt Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Transcript
                </label>
                <div className="border border-[#F1F1F1] md:h-55 md:w-1/2 rounded-lg p-4">
                  <div className="flex justify-between mb-4">
                    <p className="text-[#606060]">Bachelor_Transcript.pdf</p>
                    <div>
                      <Dropdown menu={{ items }} trigger={["click"]}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <MoreVertical className="w-5 h-5" />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                  <Image src={ImageIcon} alt="Transcript Image" />
                </div>
              </div>
              {/* Transaction ID */}
              <div>
                <div>
                  <label
                    htmlFor="Transaction_ID"
                    className="block font-medium mb-2"
                    style={{ color: "var(--color-grayish)" }}
                  >
                    Transaction ID / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    id="Transaction_ID"
                    placeholder="Transaction ID : 45151510"
                    className={`w-full bg-white rounded-lg h-14 p-4 border border-gray-300 placeholder-black`}
                    disabled
                  />
                </div>
                <div className="mt-5 flex space-x-1 md:space-x-5 justify-end">
                  <SecondaryOutlineButton
                    type="submit"
                    title="Payment Rejected"
                    className="!border-[#DE310A] text-[#DE310A]"
                  />
                  <PrimaryButton type="submit" title="Payment Verify" />
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr className="text-[#B5B5B5]" />
        <ReceiptView
          isOpen={showReceipt}
          closeModal={() => setShowReceipt(false)}
          action={() => setShowReceipt(false)} // dummy action
        />
      </section>
    </section>
  );
}
