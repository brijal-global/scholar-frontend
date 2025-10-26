"use client";
import Image from "next/image";
import icon from "@/assets/icons/UniversityIcon.svg";
import { PrimaryButton } from "@/components/ui/Buttons";

const ApplicationDashboard = ({}: { index: number }) => {
  const universityList = [
    {
      id: 1,
      universityName: "Seoul National University",
      imageURL: icon,
      status: "Submitted",
    },
    {
      id: 2,
      universityName: "Seoul National University",
      imageURL: icon,
      status: "Submitted",
    },
    {
      id: 3,
      universityName: "Seoul National University",
      imageURL: icon,
      status: "Approved",
    },
    {
      id: 4,
      universityName: "Seoul National University",
      imageURL: icon,
      status: "Rejected",
    },
    {
      id: 5,
      universityName: "Seoul National University",
      imageURL: icon,
      status: "Under Review",
    },
    {
      id: 6,
      universityName: "Seoul National University",
      imageURL: icon,
      status: "Approved",
    },
  ];

  const applicationDetails = [
    {
      id: 1,
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 2,
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "n/a",
    },
    {
      id: 3,
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 4,
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 5,
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
    {
      id: 6,
      programName: "Computer Science (Undergraduate)",
      intake: "June 2025",
      Submitted_On: "2024-03-15",
    },
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "ml-5 text-[#3155DC] bg-[#CAD5FF] border-[#99AEFF] border-1 border-solid rounded-md text-center text-xs w-25";
      case "Approved":
        return "ml-5 text-green-500 bg-[#BCFFBF] border-[#63E969] border-1 border-solid rounded-md text-center text-xs w-25";
      case "Rejected":
        return "ml-5 text-[#DE4F4F] bg-[#FFDEDE] border-[#FFC2C2] border-1 border-solid rounded-md text-center text-xs w-25";
      case "Under Review":
        return "ml-5 text-[#99813B] bg-[#FFF4D5] border-[#FFE18C] border-1 border-solid rounded-md text-center text-xs w-25";
      default:
        return "ml-5 text-black bg-[#CAD5FF] border-1 border-solid rounded-md text-center text-xs w-25";
    }
  };

  return (
    <>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ml-4">
          {universityList.map((item) => (
            <div
              key={item.id}
              className="bg-[#FCFCFC] border-1 border-[#E1E1E1] flex flex-col p-5 rounded-lg"
            >
              <div className="flex mb-5">
                <Image
                  src={item.imageURL}
                  alt="University Icon"
                  width={50}
                  height={50}
                />
                <div>
                  <p className="text-lg font-semibold ml-5">
                    {item.universityName}
                  </p>
                  <div className={getStatusColor(item.status)}>
                    {item.status}
                  </div>
                </div>
              </div>
              <div>
                {applicationDetails
                  .filter((detail) => detail.id === item.id)
                  .map((detail) => (
                    <div
                      key={detail.id}
                      className="flex flex-col w-full text-sm space-y-2"
                    >
                      <p className="font-normal text-sm text-[#838383]">
                        Program:
                      </p>
                      <p className="font-medium">{detail.programName}</p>
                      <p className="font-normal text-sm text-[#838383]">
                        Intake/Start Date:
                      </p>
                      <p className="font-medium"> {detail.intake}</p>
                      <p className="font-normal text-sm text-[#838383]">
                        Submitted On:
                      </p>
                      <p className="font-medium">{detail.Submitted_On}</p>
                    </div>
                  ))}
              </div>
              <PrimaryButton
                title="View Details"
                link={`/applications/${item.id}`}
                className="rounded-lg mt-10"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ApplicationDashboard;
