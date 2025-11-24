"use client";

import { PrimaryButton } from "@/components/ui/Buttons";
import { CircleCheck, Undo, CircleAlert, Expand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Documents {
  id: string;
  documentName: string;
  documentStatus: "uploaded" | "notUploaded";
}

export default function UniversityDetails() {
  const params = useParams<{ slug: string }>();
  const data = [
    {
      id: params.slug,
      uniName: "Seoul National University",
      logo: "https://t4.ftcdn.net/jpg/02/38/94/05/360_F_238940516_0BihE7YocY9vpgClPDDWuuaLneDwxtWn.jpg",
      status: "Under Review",
      program: "Computer Science (Undergraduate)",
      inTake: "June 2025",
      applicationDeadline: "2024-03-15",
      applicationFee: "$100",
      applicationFeeStatus: "Paid",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "text-[#3155DC] bg-[#CAD5FF] border-[#99AEFF] border-1 border-solid rounded-md text-center text-xs w-25";
      case "Approved":
        return "text-green-500 bg-[#BCFFBF] border-[#63E969] border-1 border-solid rounded-md text-center text-xs w-25";
      case "Rejected":
        return "-[#DE4F4F] bg-[#FFDEDE] border-[#FFC2C2] border-1 border-solid rounded-md text-center text-xs w-25";
      case "Under Review":
        return "text-[#5A5202] bg-[#F4E004] border-[#FFE18C] border-1 border-solid rounded-md text-center text-xs w-25";
      default:
        return "text-black bg-[#CAD5FF] border-1 border-solid rounded-md text-center text-xs w-25";
    }
  };
  const Documents: Documents[] = [
    {
      id: "1",
      documentName: "Academic Transcripts",
      documentStatus: "uploaded",
    },
    {
      id: "2",
      documentName: "Financial Statement",
      documentStatus: "notUploaded",
    },
    {
      id: "3",
      documentName: "Statement of Purpose",
      documentStatus: "uploaded",
    },
    { id: "4", documentName: "Resume/CV", documentStatus: "uploaded" },
    {
      id: "5",
      documentName: "Recommendation Letter",
      documentStatus: "uploaded",
    },
  ];
  return (
    <>
      <Link
        href="/applications"
        className="text-[#929292] flex items-center text-sm cursor-pointer gap-2 ml-5"
      >
        <Undo />
        <p>Back to applications</p>
      </Link>
      <div className="mt-5">
        {data.map((university) => (
          <div key={university.id}>
            {/* Header */}
            <div className="md:flex justify-between w-full" key={university.id}>
              <div className="flex items-center gap-3" key={university.id}>
                <div className="bg-white p-1 rounded-sm h-15 w-15">
                  <Image
                    src={university.logo}
                    alt={university.uniName}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-sm"
                  />
                </div>
                {/* University Name and Status */}
                <div className="flex flex-col">
                  <p className="text-3xl font-bold">{university.uniName}</p>
                  <p
                    className={getStatusColor(university.status)}
                    style={{ height: "1.5rem" }}
                  >
                    {university.status}
                  </p>
                </div>
              </div>
              <div>
                <PrimaryButton type="submit" title="Submit" className="w-3xs" />
              </div>
            </div>

            <div className="mt-10 ml-5 grid grid-cols-1 space-y-4 md:grid-cols-2 mb-10">
              {/* Discription of Program */}
              <div className="flex flex-col space-y-3">
                <div className="text-sm">
                  <p className="text-[#838383]">Program</p>
                  <p>{university.program}</p>
                </div>
                <div className="text-sm">
                  <p className="text-[#838383]">Intake/Start Date</p>
                  <p>{university.inTake}</p>
                </div>
                <div className="text-sm">
                  <p className="text-[#838383]">Application Deadline</p>
                  <p>{university.applicationDeadline}</p>
                </div>
                <div className="text-sm">
                  <p className="text-[#838383]">Application fee</p>
                  <div className="flex space-x-3">
                    <p>{university.applicationFee} </p>
                    <p>{university.applicationFeeStatus}</p>
                  </div>
                </div>
              </div>
              {/* Notes and activity */}
              <div className="text-sm bg-[#F6F8F9] p-3 rounded-lg">
                <p>Notes & Activity</p>
                <div className="bg-white  p-3 mt-2 text-[#838383] leading-relaxed">
                  <p>
                    Financial statement needs to be re-uploaded with correct
                    bank seal. Contacted admissions for clarification on format.
                    Started application, need to gather all required documents.
                    Researching scholarship opportunities.
                  </p>
                </div>
              </div>
            </div>
            {/* Document CheckList */}
            <div>
              <hr className="text-[#E1E1E1]" />
              <h2 className="font-bold text-[#252C32] text-base mb-4 ml-4 mt-5">
                Document CheckList
              </h2>
            </div>
          </div>
        ))}
        <div>
          {/* Sort according to status */}
          {Documents.sort((a, b) => {
            if (
              a.documentStatus === "notUploaded" &&
              b.documentStatus !== "notUploaded"
            ) {
              return -1;
            } else if (
              a.documentStatus !== "notUploaded" &&
              b.documentStatus === "notUploaded"
            ) {
              return 1;
            } else {
              return 0;
            }
          }).map((document) => (
            <div
              className="ml-4 flex justify-between items-center bg-[#FEFEFE] border-solid"
              key={document.id}
            >
              <div className="flex justify-between" key={document.id}>
                <div className="flex space-x-3 h-14">
                  {document.documentStatus === "uploaded" ? (
                    <p>
                      <CircleCheck className="text-[#29935C]" />
                    </p>
                  ) : (
                    <p>
                      <CircleAlert className="text-[#FFAE00]" />
                    </p>
                  )}
                  <p>{document.documentName}</p>
                  <p className="text-[#FF5151]">(Required)</p>
                </div>
              </div>
              <div>
                {/* So the button according to upload status */}
                {document.documentStatus === "uploaded" ? (
                  <div className="flex items-center space-x-2">
                    <Expand className="text-[#606060]" />
                    <PrimaryButton
                      title="Submitted"
                      type="submit"
                      className="!h-5 !bg-[#7088FF]"
                    />
                    <PrimaryButton
                      title="Reupload"
                      type="submit"
                      className="!h-5 !border-[#B5B5B5] !bg-white !text-[#000] !border-solid"
                    />
                  </div>
                ) : (
                  <PrimaryButton
                    title="Upload"
                    type="submit"
                    className="!h-5 !border-[#B5B5B5] !bg-white !text-[#000] !border-solid"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
