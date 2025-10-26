/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Applications = ({ applicationList }: { applicationList: any[] }) => {
  const StatusCard = ({ status }: { status: string }) => {
    return (
      <div className="flex items-center justify-between space-x-2 text-xs">
        <span
          className={`px-3 py-1 rounded-md font-medium cursor-default
                ${status === "Submitted" && "bg-[#7088FF] text-white"}
                ${status === "Draft" && "text-[#606060]"}
                ${status === "Approved" && "bg-[#43AE48] text-white"}
                ${status === "Under Review" && "bg-[#F4E004] text-blackish"}
                ${status === "Rejected" && "bg-red-500 text-white"}
              `}
        >
          {status}
        </span>
        <Link
          href={"#"}
          className="text-[#606060] hover:text-grayish hover:bg-gray-50 border-1 border-[#B5B5B5] px-3 py-1 rounded-lg transition-all cursor-pointer"
        >
          {status === "Submitted" && "Talk to consultant"}
          {status === "Under Review" && "Talk to consultant"}
          {status === "Approved" && "View acceptance letter"}
          {status === "Draft" && "Complete now"}
          {status === "Rejected" && "Talk to consultant"}
        </Link>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#F6F6F6] border-1 border-[#EBEBEB] rounded-lg p-6 max-h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-semibold text-blackish">
          Your university applications
        </h2>
        <Link
          href={"#"}
          className="text-[#838383] text-sm hover:text-grayish transition-all"
        >
          See all
        </Link>
      </div>

      <div className="space-y-4 w-full overflow-y-auto no-scrollbar">
        {applicationList?.slice(0, 5)?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white rounded-lg p-3 w-full"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden border-1 border-[#EBEBEB] bg-white">
                <Image
                  src={item.imageURL}
                  alt="University Icon"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blackish text-base line-clamp-1">
                  {item.universityName}
                </h3>
                <p className="text-xs text-[#838383] line-clamp-1">
                  {item.programName}
                </p>
              </div>
              <StatusCard status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
