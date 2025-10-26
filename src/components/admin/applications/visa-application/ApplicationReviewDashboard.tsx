"use client";

import {
  ChevronDown,
  CreditCard,
  FilesIcon,
  FileText,
  GraduationCap,
  Home,
  MailOpen,
  Menu,
  Speaker,
  User,
  X,
} from "lucide-react";
import BasicInformation from "./PersonalInformation";
import Address from "./Address";
import Education from "../Education";
import LanguageProficency from "./LanguageProficency";
import RecommendationLetter from "./RecommendationLetter";
import SOP from "./SOP";
import Documents from "./Documents";
import Payment from "./Payments";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
// Models
import StatusPending from "@/components/modals/admin/ApplicationPending";
import StatusRejected from "@/components/modals/admin/ApplicationRejected";
import SuccessSubmission from "@/components/modals/admin/ApplicationSubmitted";
import StatusApproved from "@/components/modals/admin/ApprovedApplication";

interface applicationStatus {
  status: "Approved" | "Rejected" | "Pending" | "UnderReview";
}

export default function ApplicationReviewDashboard() {
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<applicationStatus["status"]>("UnderReview");

  const [pendingStatus, setPendingStatus] = useState<
    applicationStatus["status"] | null
  >(null);

  const navItems = [
    { id: 1, label: "Personal Information", icon: User },
    { id: 2, label: "Address & Location", icon: Home },
    { id: 3, label: "Educational Background", icon: GraduationCap },
    { id: 4, label: "Language Proficiency Test", icon: FilesIcon },
    { id: 5, label: "Recommendation Letter", icon: MailOpen },
    { id: 6, label: "SOP", icon: FileText },
    { id: 7, label: "Documents", icon: Speaker },
    { id: 8, label: "Payment", icon: CreditCard },
  ];

  const statusStyles: Record<applicationStatus["status"], string> = {
    Approved: "bg-[#43AE48] text-white",
    Rejected: "bg-[#DE310A] text-white",
    Pending: "bg-[#5073FF] text-white",
    UnderReview: "bg-[#FFFF00] text-black",
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <BasicInformation />;
      case 2:
        return <Address />;
      case 3:
        return <Education />;
      case 4:
        return <LanguageProficency />;
      case 5:
        return <RecommendationLetter />;
      case 6:
        return <SOP />;
      case 7:
        return <Documents />;
      case 8:
        return <Payment />;
      default:
        return <BasicInformation />;
    }
  };

  // Navigation function
  const handleNavClick = (id: number) => {
    setStep(id);
    setIsSidebarOpen(false);
  };

  // Functions to handles status change
  const handleApproved = () => {
    setPendingStatus("Approved");
    setShowApproved(true);
  };

  const handleRejected = () => {
    setPendingStatus("Rejected");
    setShowRejected(true);
  };

  const handlePending = () => {
    setPendingStatus("Pending");
    setShowPending(true);
  };

  // Select items for dropdown
  const items: MenuProps["items"] = [
    {
      label: (
        <button className="text-[#838383] my-2 mx-10" onClick={handleApproved}>
          Approved
        </button>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button className="text-[#838383] my-2 mx-10" onClick={handlePending}>
          Pending
        </button>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button className="text-[#838383] my-2 mx-10" onClick={handleRejected}>
          Rejected
        </button>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="text-[#838383] my-2 mx-10"
          onClick={() => setSelectedStatus("UnderReview")}
        >
          Under Review
        </button>
      ),
      key: "3",
    },
  ];

  // Update Status Change
  const confirmStatusChange = () => {
    if (pendingStatus) {
      setSelectedStatus(pendingStatus);
    }
    if (pendingStatus === "Approved") {
      setShowApproved(false);
      setShowSuccess(true);
    }
    // setShowApproved(false);
    setShowRejected(false);
    setShowPending(false);
    setPendingStatus(null);
  };

  const cancelStatusChange = () => {
    setShowApproved(false);
    setShowRejected(false);
    setShowPending(false);
    setPendingStatus(null);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="bg-white p-4 flex justify-between items-center md:hidden">
        <h2 className="text-lg font-bold text-gray-800">
          University application review of “Student name”
        </h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:w-64 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 md:hidden">
            Profile Settings
          </h2>
          <nav className="pt-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center p-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  step === item.id ? "text-white" : "text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    step === item.id ? "var(--color-primary)" : "transparent",
                  color: step !== item.id ? "var(--color-grayish)" : undefined,
                }}
              >
                {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* For desktop view */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="hidden md:block md:text-3xl ml-4 font-bold">
          Visa application review of “Student name”
        </h2>
        {/* Visa Status Select */}
        <div className="relative">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-sm h-12 text-sm font-medium cursor-pointer ${statusStyles[selectedStatus]}`}
              >
                {selectedStatus === "UnderReview"
                  ? "Under Review"
                  : selectedStatus}
                <ChevronDown className="w-4 h-4" />
              </div>
            </a>
          </Dropdown>
        </div>
      </div>
      <hr className="text-[#C6C6C6]" />
      <div className="flex flex-row space-x-10 mt-2">
        <div className="hidden md:block w-64 bg-white p-4">
          <nav>
            {/* Navigation between setting for desktop */}
            <div className="pt-4 flex flex-col space-y-2 w-3xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center p-2 rounded-lg font-medium ${
                    step === item.id ? "text-white" : "text-gray-700"
                  }`}
                  style={{
                    backgroundColor:
                      step === item.id ? "var(--color-primary)" : "transparent",
                    color:
                      step !== item.id ? "var(--color-grayish)" : undefined,
                  }}
                >
                  {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
        {/* Render of forms */}
        <section className="py-6 w-full">{renderForm()}</section>
      </div>
      {/* Models Rendering*/}
      <StatusApproved
        isOpen={showApproved}
        closeModal={cancelStatusChange}
        action={confirmStatusChange}
      />

      <StatusPending
        isOpen={showPending}
        closeModal={cancelStatusChange}
        action={confirmStatusChange}
      />

      <StatusRejected
        isOpen={showRejected}
        closeModal={cancelStatusChange}
        action={confirmStatusChange}
      />

      <SuccessSubmission
        isOpen={showSuccess}
        closeModal={() => setShowSuccess(false)}
        action={() => setShowSuccess(false)} // dummy action
      />
    </>
  );
}
