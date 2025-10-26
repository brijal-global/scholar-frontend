import React from "react";
import { BsPeople } from "react-icons/bs";
import { RxFileText } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";

const Stats = () => {
  const stats = [
    {
      title: "Total Students",
      icon: (
        <BsPeople
          size={30}
          className="bg-white rounded-xl p-1.5 text-[#29935C]"
        />
      ),
      value: 245,
    },
    {
      title: "Application in progress",
      icon: <RxFileText size={22} className="text-[#6941C6]" />,
      value: 205,
    },
    {
      title: "Visa Approval",
      icon: <SiTicktick size={20} className="text-[#FB6514]" />,
      value: 52,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#F3F3F3] border-1 border-[#EBEBEB] rounded-lg p-6 flex flex-col justify-center items-start gap-3"
        >
          <div className="flex items-center gap-2">
            {stat.icon}
            <p className="text-blackish">{stat.title}</p>
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
