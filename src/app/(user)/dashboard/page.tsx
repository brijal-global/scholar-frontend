"use client";

import { useState } from "react";
import Header from "@/components/user/dashboard/Header";
import Progress from "@/components/user/dashboard/Progress";
import Applications from "@/components/user/dashboard/Applications";
import Notifications from "@/components/user/dashboard/Notifications";
import universityIcon from "@/assets/icons/UniversityIcon.svg";

export default function Dashboard() {
  const steps = [
    "Profile Setup",
    "University Applications",
    "Offers Received",
    "Visa Application",
    "Visa Granted",
    "Payment",
    "Pre Departure Help",
  ];

  const [currentStep, setCurrentStep] = useState(3);

  const applicationList = [
    {
      id: 1,
      universityName: "University of South-West Ukanda, UK",
      imageURL: universityIcon,
      status: "Submitted",
      programName: "Software Engineering with specialization in Cybersecurity",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 2,
      universityName: "Seoul National University",
      imageURL: universityIcon,
      status: "Approved",
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 3,
      universityName: "Seoul National University",
      imageURL: universityIcon,
      status: "Draft",
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 4,
      universityName: "Seoul National University",
      imageURL: universityIcon,
      status: "Rejected",
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 5,
      universityName: "Seoul National University",
      imageURL: universityIcon,
      status: "Under Review",
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 6,
      universityName: "Seoul National University",
      imageURL: universityIcon,
      status: "Submitted",
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
  ];

  const notificationList = [
    ...Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      universityName: "University of South-West Ukanda, UK",
      imageURL: universityIcon,
      content:
        "Your application has been submitted successfully. Please wait for the approval from the university.",
    })),
  ];

  return (
    <div className="">
      <Header steps={steps} currentStep={currentStep} />

      <Progress
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* University Applications */}
        <Applications applicationList={applicationList} />

        {/* Notifications */}
        <Notifications notificationList={notificationList} />
      </div>
    </div>
  );
}
