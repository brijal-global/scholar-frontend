import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { RxFileText } from "react-icons/rx";
import { MdOutlineSpeaker } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FcApproval } from "react-icons/fc";

const Stats = () => {
  const stats = [
    {
      title: "Total Students",
      icon: (
        <FaUserGraduate size={35} className="rounded-xl p-1.5 text-[#29935C]" />
      ),
      value: 1245,
    },
    {
      title: "Active Consultancy",
      icon: <LuGraduationCap size={30} className="text-[#29935C]" />,
      value: 25,
    },
    {
      title: "University Application",
      icon: <RxFileText size={25} className="text-[#29935C]" />,
      value: 52,
    },
    {
      title: "Visa Application",
      icon: <MdOutlineSpeaker size={28} className="text-[#29935C]" />,
      value: 52,
    },
    {
      title: "Total Payment",
      icon: <LuGraduationCap size={30} className="text-[#29935C]" />,
      value: 52,
    },
    {
      title: "Pending Application",
      icon: <RiErrorWarningLine size={30} className="text-[#E1AA0F]" />,
      value: 52,
    },
    {
      title: "Document Pending",
      icon: <HiOutlineMailOpen size={30} className="text-[#E1AA0F]" />,
      value: 52,
    },
    {
      title: "Approval Rate",
      icon: <FcApproval size={30} className="text-[#29935C]" />,
      value: 52,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="border-1 border-[#EBEBEB] rounded-lg p-6 flex flex-col justify-center items-start gap-3 shadow-md"
        >
          <div className="flex justify-between items-center w-full">
            <p className="text-blackish">{stat.title}</p>
            <p>{stat.icon}</p>
          </div>

          <p className="text-xl xl:text-2xl font-semibold text-blackish">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
